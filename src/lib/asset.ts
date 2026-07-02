// Resolves a Lovable CDN asset pointer (.asset.json) to a fully-qualified URL.
// On Lovable the relative "/__l5e/..." path is served directly. On other hosts
// (e.g. Vercel) we prefix the published Lovable origin so the CDN asset still loads.
const CDN_ORIGIN = "https://luxe-sanctuary-web.lovable.app";

type AssetPointer = { url: string };

export function asset(pointer: AssetPointer): string {
  const path = pointer.url;
  if (/^https?:\/\//.test(path)) return path;
  return `${CDN_ORIGIN}${path}`;
}
