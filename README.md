# Wivosoft website

Public consultancy website at `wivosoft.dk`, built with React, TypeScript and vinext and hosted on Cloudflare Workers. The experimental `/demo` is separate from the public homepage.

## Local development

Node.js 22.13 or later is required.

```sh
npm install
npm run dev
```

```sh
npm test           # production build, rendered pages and contact API tests
npm run lint
npx tsc --noEmit
```

## Contact form setup

The flow asks whether someone needs team support, a project, or help defining the problem. It sends enquiries to **hello@wivosoft.dk**, with the visitor’s email as the reply-to address. The recipient is fixed on the server.

Until all settings below exist, the flow offers **Open email draft** and includes the entered details in the draft. It never reports that a message was sent just because a draft was opened. JavaScript-free visitors can use the direct email link.

1. Create a [Resend](https://resend.com/docs/send-with-cloudflare-workers) account and verify a sending domain such as `wivosoft.dk` or a dedicated subdomain. Add the DNS records Resend provides. Create a sending API key restricted to that domain. Make sure `hello@wivosoft.dk` receives mail; Resend sends messages but does not create your inbox.
2. Create a managed [Cloudflare Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/), with the actual website hostname(s) allowed. Include a development hostname if you want to test real delivery locally. The site key is public; the secret key stays on the server. The handler verifies the token’s hostname and `contact` action. Production must use real keys, not the documented dummy test keys.
3. In the Cloudflare dashboard for the **wivosoft** Worker, add these runtime settings:

| Setting | Type | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | Your restricted Resend sending key |
| `CONTACT_FROM_EMAIL` | Text variable | `Wivosoft <website@wivosoft.dk>` or another address on your verified sending domain |
| `TURNSTILE_SECRET_KEY` | Secret | Your widget’s secret key |
| `TURNSTILE_SITE_KEY` | Text variable | Your widget’s public site key |

Use the dashboard or `npx wrangler secret put RESEND_API_KEY` and `npx wrangler secret put TURNSTILE_SECRET_KEY` for secrets. Do not paste keys into source files or commits. A sender’s exact address must match your verified Resend domain. These are runtime settings, not `NEXT_PUBLIC_` build variables, so no key is bundled into the browser. The public configuration endpoint returns only the enabled state and Turnstile site key.

For local delivery, copy `.dev.vars.example` to `.dev.vars` and enter your settings there. `.dev.vars` is ignored by Git. Cloudflare’s Node compatibility exposes the runtime bindings through [process.env](https://developers.cloudflare.com/workers/configuration/environment-variables/#environment-variables-and-nodejs-compatibility).

After configuring the deployed Worker, test one enquiry and confirm it arrives in `hello@wivosoft.dk`; reply should address the visitor. Also test an invalid email, a failed security check and a temporary network failure. Automated tests use mock providers and send no real emails. Provider acceptance confirms submission, not final inbox delivery; check Resend delivery events if a message does not arrive.

The API limits message/body sizes, rejects malformed and cross-origin submissions, validates Turnstile server-side and uses Resend idempotency keys for retries. It never logs enquiry text or credentials and does not store enquiries in a website database. If traffic warrants it, add a Cloudflare rate-limit rule for `POST /api/contact`.

## Content and business details

- Founder profiles and examples describe previous Netcompany assignments; they are not presented as Wivosoft client engagements.
- Products are labelled as independent projects. CV downloads live in `public/cv/`; replace those PDFs when details change.
- Python remains listed, with its university background explained in the founder section.
- Availability is stated for remote work and on-site work in Copenhagen.
- `/privacy` describes enquiry handling and the actual contact services. Review it as business details change. Once Wivosoft is registered, add its legal name, business address and CVR, and update the privacy notice’s controller details. Review enquiry mail periodically and delete it when no longer needed.

## Deployment and Git

`wrangler.jsonc` configures the Cloudflare Worker and the `wivosoft.dk` custom domain. Deploy through your normal workflow, or use `npm run deploy` when you intend to publish. Git commits alone do not confirm deployment.

This checkout has two remotes: `old` points to **Wivosoft/website** and `origin` points to a personal repository. To push the local `develop` branch to the requested shared repository:

```sh
git push -u old develop
```

If remote `develop` has changed, fetch and reconcile it first; do not force-push.

For GitHub authentication on this computer, install the [GitHub CLI](https://cli.github.com/), then run:

```sh
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
```

Sign in with an account that has access to `Wivosoft/website`, and authorize the Wivosoft organization if its access controls require it. GitHub CLI then acts as Git’s credential helper. See [GitHub’s authentication guide](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git).
