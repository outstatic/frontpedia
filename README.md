<a href="https://frontpedia.com">
  <img src="https://frontpedia.com/images/home-preview.webp" alt="Frontpedia - A curated design and frontend resource website" />
  <h1 align="center">Frontpedia</h1>
</a>

<p align="center">
  An open source frontend and design resources website.
</p>

<p align="center">
  <a href="https://github.com/outstatic/frontpedia/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/outstatic/frontpedia?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#to-deploy-with-vercel"><strong>Deploy With Vercel</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>



## Introduction

[Frontpedia](http://frontpedia.com/) is a curation website for designers and frontend developers.

An open source project by [Andre Vitorio](https://x.com/AndreVitorio).

## Key features

- 📝 **Full-Featured Dashboard**: Powered by [Outstatic](https://outstatic.com)
- 🚀 **Quick and Easy Setup**: No hassle installation
- 💾 **Database-Free**: No need for a database
- 🧩 **Custom Fields**: Tailor the data to your needs
- 💌 **Newsletter Subscription**: Integrated with Resend
- 📺 **Video Previews**: Using Cloudinary
- 🤖 **Vercel's BotID**: Prevent bot submissions

## Installation

### Getting Started

You can select to deploy with Vercel or set up the project locally.

First, follow the instructions in the [Getting Started](https://outstatic.com/docs/getting-started) section of the Outstatic documentation.

### To deploy with Vercel

Click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foutstatic%2Ffrontpedia&env=OUTSTATIC_API_KEY&envDescription=Follow%20the%20instructions%20on%20the%20Frontpedia%20repository.&envLink=https%3A%2F%2Fgithub.com%2Foutstatic%2Ffrontpedia%23installation&project-name=frontpedia&repository-name=frontpedia&demo-title=Frontpedia&demo-description=Curated%20frontend%20and%20design%20resources&demo-url=https%3A%2F%2Ffrontpedia.com&demo-image=https%3A%2F%2Ffrontpedia.com%2Fimages%2Fog-image.png)

And follow the [Deploy with Vercel](https://outstatic.com/docs/getting-started#deploy-with-vercel) steps. 

Continue reading for the remaining environment variables.

### Setting up locally 

Clone the repository.

To run the app locally, you can run the following commands:

```
pnpm i
pnpm build
pnpm dev
```

Continue reading for the remaining environment variables.

### Set up Outstatic for content management



## Optional Setup

### Set mailing list and submission notifications

Add the following to the `.env.local` file:

- RESEND_API_KEY
- RESEND_SEGMENT_ID
- NEXT_PUBLIC_EMAIL_LIST_ENABLED - set to `true` to show the subscribe UI and enable the `/subscribe` endpoint. Defaults to `false` when omitted.
- NEXT_PUBLIC_SUBMIT_CONTENT_ENABLED - set to `true` to show the submit UI and enable the `/submit` endpoint. Defaults to `false` when omitted.
- FROM_EMAIL - the sender address for notification emails when submit content is enabled (e.g. `submissions@frontpedia.com`)
- OWNER_EMAIL - the email address that receives a notification when a new post is submitted

To get your API key and segment ID, visit [resend.com](https://resend.com).

### Set up Vercel BotID to protect form submissions

If the project is on Vercel, enable BotID to protect form submissions.

### Analytics

Frontpedia includes a unified analytics component that supports **Google Analytics** and **Umami**. Set the corresponding environment variables in `.env.local` to enable your preferred provider:

**Google Analytics:**
- `NEXT_PUBLIC_GA_TRACKING_ID` - your GA measurement ID (e.g. `G-XXXXXXXXXX`)

**Umami:**
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` - your Umami website ID
- `NEXT_PUBLIC_UMAMI_HOST` _(optional)_ - custom script URL (defaults to `/stats/script.js`)
- `NEXT_PUBLIC_UMAMI_HOST_URL` _(optional)_ - custom host URL for data collection

Only one provider is used at a time -- Google Analytics takes priority if both are configured. Check `.env.local.example` for the full list of variables.

## Tech Stack

Frontpedia is built on the following stack:

- [Outstatic](https://outstatic.com)- CMS
- [Next.js](https://nextjs.org) - framework
- [TailwindCSS](https://tailwindcss.com/) - styles
- [shadcn/ui](https://ui.shadcn.com/) - components
- [React Hook Form](https://react-hook-form.com/) - forms
- [Zod](https://zod.dev/) - validation
- [Resend](https://resend.com) - newsletter subscription & submission notifications
- [Cloudinary](https://cloudinary.com) - video previews

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/outstatic/frontpedia/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/outstatic/frontpedia/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/outstatic/frontpedia/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=outstatic/frontpedia" />
</a>


## License

Licensed under the [Apache-2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
