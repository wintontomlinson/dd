import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const InquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(40),
  interest: z.string().trim().max(120).optional().default(""),
  budget: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

async function sendEmails(data: z.infer<typeof InquirySchema>, origin: string) {
  // Best-effort: send confirmation + team notification via Lovable Emails.
  // Silently no-ops until an email domain + infrastructure is configured.
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const notifyTo = process.env.INQUIRY_NOTIFY_EMAIL;
  const base = origin.replace(/\/$/, "");
  const send = async (body: Record<string, unknown>) => {
    try {
      const res = await fetch(`${base}/lovable/email/transactional/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(LOVABLE_API_KEY ? { Authorization: `Bearer ${LOVABLE_API_KEY}` } : {}),
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) console.warn("[inquiry] email send skipped:", res.status);
    } catch (e) {
      console.warn("[inquiry] email send failed:", e);
    }
  };

  await send({
    templateName: "inquiry-confirmation",
    recipientEmail: data.email,
    idempotencyKey: `inquiry-confirm-${data.email}-${Date.now()}`,
    templateData: { name: data.name, interest: data.interest, budget: data.budget },
  });
  if (notifyTo) {
    await send({
      templateName: "inquiry-notification",
      recipientEmail: notifyTo,
      idempotencyKey: `inquiry-notify-${data.email}-${Date.now()}`,
      templateData: data,
    });
  }
}

export const Route = createFileRoute("/api/public/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = InquirySchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.flatten() },
            { status: 422 },
          );
        }
        const data = parsed.data;

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!supabaseUrl || !supabaseKey) {
          console.error("[inquiry] missing Supabase environment variables");
          return Response.json(
            { error: "Service temporarily unavailable" },
            { status: 503 },
          );
        }

        const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { error } = await supabase.from("inquiries").insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          interest: data.interest || null,
          budget: data.budget || null,
          message: data.message || null,
        });

        if (error) {
          console.error("[inquiry] insert failed:", error.message);
          return Response.json({ error: "Could not save enquiry" }, { status: 500 });
        }

        const origin = new URL(request.url).origin;
        await sendEmails(data, origin);

        return Response.json({ ok: true });
        } catch (err) {
          console.error("[inquiry] unexpected error:", err);
          return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 },
          );
        }
      },
    },
  },
});