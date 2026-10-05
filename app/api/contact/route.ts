import { contactIsEnabled, getContactConfig, handleContact } from "../../../lib/contact";

export const dynamic = "force-dynamic";

export function GET() {
  const config = getContactConfig();
  const enabled = contactIsEnabled(config);
  return Response.json({ enabled, siteKey: enabled ? config.turnstileSiteKey : null }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export function POST(request: Request) {
  return handleContact(request, getContactConfig());
}
