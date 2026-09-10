# HESYN — GitHub Pages + GDPR-conscious static site

This package is ready to upload to a GitHub repository.

## Files
- `index.html` — main site + Formspree inquiry form
- `privacy.html` — Privacy Policy
- `cookies.html` — Cookie Policy
- `terms.html` — Terms of Use
- `404.html` — fallback page
- `assets/styles.css` — all site styles
- `assets/site.js` — locally hosted form/UI JavaScript

## Important before public launch
Search the legal pages for `[PLACEHOLDER]` and replace:
1. legal entity / controller name
2. business address
3. privacy email
4. EEA supervisory authority (if applicable)
5. governing law / venue
6. legal/general contact email

## Privacy architecture
- No Google Analytics
- No Meta Pixel
- No LinkedIn Insight Tag
- No remotely loaded Google Fonts
- No YouTube/Vimeo embeds
- No third-party JavaScript CDN
- No cookies/localStorage/sessionStorage set by HESYN site code
- Form data goes to Formspree endpoint `xvkolajl` only when a visitor submits the inquiry form
- GitHub Pages hosts the website and may process connection/security logs

## Form
The form posts to:
`https://formspree.io/f/xvkolajl`

`assets/site.js` first tries an AJAX submission for an in-page branded success message.
If AJAX is blocked, it falls back to a normal HTML form POST so the inquiry can still be sent.

## Legal note
These policy templates are operational drafts designed around this exact site configuration. They are not a substitute for legal advice. Re-review the policies whenever you add analytics, advertising pixels, CRM integrations, newsletters, embedded third-party content, new processors, or a new legal entity.
