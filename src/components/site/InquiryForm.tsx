import { useState } from "react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

type Data = {
  interest: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const STEPS = ["Interest", "Details", "Contact"] as const;

export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Data>({
    interest: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set = (k: keyof Data, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => {
      const next = { ...e };
      delete next[k];
      return next;
    });
    if (submitError) setSubmitError(null);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !data.interest) e.interest = "Please select an option.";
    if (step === 1 && !data.budget) e.budget = "Please select a range.";
    if (step === 2) {
      const name = data.name.trim();
      const email = data.email.trim();
      const phone = data.phone.trim();
      if (!name) e.name = "Please enter your full name.";
      else if (name.length > 120) e.name = "Name is too long.";
      if (!email) e.email = "Please enter your email address.";
      else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email address.";
      if (!phone) e.phone = "Please enter your phone number.";
      else if (!/^[+()\d\s-]{6,20}$/.test(phone))
        e.phone = "Please enter a valid phone number.";
      if (data.message.length > 2000) e.message = "Message is too long (max 2000 characters).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        interest: data.interest.trim(),
        budget: data.budget.trim(),
        message: data.message.trim(),
      };
      const res = await fetch("/api/public/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setDone(true);
        return;
      }

      if (res.status === 422) {
        setSubmitError(
          "Some details need attention. Please review your entries and try again.",
        );
      } else if (res.status === 429) {
        setSubmitError("Too many attempts. Please wait a moment and try again.");
      } else if (res.status >= 500) {
        setSubmitError(
          "Our servers are having a moment. Please try again shortly.",
        );
      } else {
        setSubmitError(
          "We couldn't submit your enquiry just now. Please try again in a moment.",
        );
      }
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (!validate()) return;
    if (step < 2) setStep(step + 1);
    else void submit();
  };

  const fieldClass = (k: string) =>
    `w-full border-b bg-transparent py-3 text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-gold ${
      errors[k] ? "border-destructive animate-[wiggle_0.3s]" : "border-border"
    }`;

  if (done) {
    return (
      <div className="glass rounded-sm border border-border bg-card p-10 text-center md:p-14">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-foreground">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
          Thank you, {data.name || "guest"}. A private client director will be in touch
          within one business day to arrange your viewing.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-border bg-card p-8 md:p-12">
      <div className="mb-10 flex items-center gap-4">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs transition-colors duration-500 ${
                i <= step
                  ? "border-gold bg-gold text-charcoal"
                  : "border-border text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`hidden text-xs uppercase tracking-[0.16em] sm:inline ${
                i <= step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <span className="hidden h-px flex-1 bg-border md:block" />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[220px]">
        {step === 0 && (
          <div className="animate-fade-in">
            <label className="overline text-gold">I am interested in</label>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["A villa residence", "The full estate", "Investment programme", "A private viewing"].map(
                (opt) => (
                  <button
                    key={opt}
                    onClick={() => set("interest", opt)}
                    className={`border p-5 text-left text-sm transition-colors duration-300 ${
                      data.interest === opt
                        ? "border-gold bg-gold/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/40"
                    }`}
                  >
                    {opt}
                  </button>
                ),
              )}
            </div>
            {errors.interest && (
              <p className="mt-4 text-sm text-destructive">{errors.interest}</p>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <label className="overline text-gold">Anticipated budget</label>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["₹8 – 12 Cr", "₹12 – 20 Cr", "₹20 – 35 Cr", "₹35 Cr +"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => set("budget", opt)}
                  className={`border p-5 text-left text-sm transition-colors duration-300 ${
                    data.budget === opt
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.budget && (
              <p className="mt-4 text-sm text-destructive">{errors.budget}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <input
                className={fieldClass("name")}
                placeholder="Full name"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <input
                  className={fieldClass("email")}
                  placeholder="Email address"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  className={fieldClass("phone")}
                  placeholder="Phone number"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>
            <div>
              <textarea
                className={`${fieldClass("message")} resize-none`}
                rows={3}
                placeholder="A note (optional)"
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-2 text-sm text-destructive">{errors.message}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            disabled={submitting}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <span />
        )}
        <button onClick={next} className="btn-gold" disabled={submitting}>
          {step === 2 ? (submitting ? "Submitting…" : "Submit Enquiry") : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {submitError && (
        <p className="mt-4 text-right text-sm text-destructive">{submitError}</p>
      )}
    </div>
  );
}