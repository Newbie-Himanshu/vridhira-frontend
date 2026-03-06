<!--
  ============================================================
  VRIDHIRA — E-Commerce for Indian Artisans
  ============================================================
  Author:         Himanshu
  GitHub:         https://github.com/Newbie-Himanshu
  Repo:           https://github.com/Newbie-Himanshu/vridhira-frontend
  Copyright:      2026 Himanshu — Vridhira. All rights reserved.
  License:        MIT
  Last Modified:  Himanshu via GitHub Copilot on 2026-03-06
  Change:         Deep-redesigned README — unique layout, India-first vibe
  ============================================================
-->

<p align="center">
  <a href="https://github.com/vridhira/vridhira-frontend">
    <img
      src="https://img.shields.io/badge/%F0%9F%9B%95%20VRIDHIRA-Open%20Commerce%20for%20Indian%20Artisans-8B4513?style=for-the-badge&labelColor=2d1a0e&color=8B4513"
      alt="Vridhira Banner"
      height="48"
    />
  </a>
</p>

<h1 align="center">Vridhira — Storefront</h1>

<p align="center">
  India's open e-commerce platform for artisans and handcraft sellers<br />
  <em>Self-hosted · India-native payments · Open source</em>
</p>

<p align="center">
  <a href="#-quickstart">Quickstart</a>
  &nbsp;·&nbsp;
  <a href="#-features">Features</a>
  &nbsp;·&nbsp;
  <a href="#-india-first-commerce">India-First</a>
  &nbsp;·&nbsp;
  <a href="#-payments">Payments</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Newbie-Himanshu/vridhira-backend">Backend Repo</a>
  &nbsp;·&nbsp;
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License" />
  </a>
  <img src="https://img.shields.io/badge/version-0.1.0-8B4513?style=flat-square" alt="v0.1.0" />
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
  </a>
  <a href="https://medusajs.com">
    <img src="https://img.shields.io/badge/MedusaJS-v2-7c3aed?style=flat-square" alt="MedusaJS v2" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://github.com/Newbie-Himanshu/vridhira-frontend/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_for-India_%F0%9F%87%AE%F0%9F%87%B3-FF9933?style=flat-square&labelColor=138808" alt="Made for India" />
  &nbsp;
  <img src="https://img.shields.io/badge/Payments-Razorpay_%7C_UPI_%7C_COD-2196F3?style=flat-square" alt="Payments" />
  &nbsp;
  <img src="https://img.shields.io/badge/Search-Algolia-003DFF?style=flat-square&logo=algolia&logoColor=white" alt="Algolia" />
  &nbsp;
  <img src="https://img.shields.io/badge/Fulfillment-Shiprocket-orange?style=flat-square" alt="Shiprocket" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [India-First Commerce](#-india-first-commerce)
- [Quickstart](#-quickstart)
- [Payments](#-payments)
- [Environment Variables](#-environment-variables)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Related Repositories](#-related-repositories)
- [Resources](#-resources)
- [Contributing](#-contributing)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)
- [Author](#-author)

---

## 🛕 Overview

**Vridhira** is an open-source, India-first e-commerce storefront designed for artisans, weavers, potters, and handcraft sellers — people whose work deserves a digital home built for how India actually shops.

This is the customer-facing storefront. It connects to the **Vridhira Backend** — a MedusaJS v2 server with custom Indian commerce modules — to deliver shopping experiences optimised for Indian buyers: UPI, COD with OTP, GST-inclusive pricing, Hindi-ready typography, and Shiprocket logistics.

> _Think of it as Shopify's Indian artisan cousin — open source, self-hosted, and built on Indian payment rails from day one._

---

## ✨ Features

<table>
  <tr>
    <td valign="top" width="33%">
      <h3>🛒 Full Commerce</h3>
      <p>Product catalogue, collections, tags, inventory tracking, variants (size/colour/material). Everything a physical craft store needs, online.</p>
    </td>
    <td valign="top" width="33%">
      <h3>💳 India-Native Payments</h3>
      <p>Razorpay UPI, cards, netbanking, wallets, and EMI. Cash on Delivery with OTP fraud prevention. Covers how India actually pays.</p>
    </td>
    <td valign="top" width="33%">
      <h3>🚚 Smart Fulfillment</h3>
      <p>Shiprocket-powered shipping with real-time order tracking and delivery status updates. India's largest D2C logistics network.</p>
    </td>
  </tr>
  <tr>
    <td valign="top" width="33%">
      <h3>🔍 Instant Search</h3>
      <p>Algolia-powered search with instant product results, filters, and faceted navigation. Finds the right craft at the right moment.</p>
    </td>
    <td valign="top" width="33%">
      <h3>👤 Customer Accounts</h3>
      <p>Registration, login, order history, saved addresses, and wishlist management. Repeat buyers, remembered.</p>
    </td>
    <td valign="top" width="33%">
      <h3>🌏 India-Ready Stack</h3>
      <p>INR currency, GST-inclusive pricing, Hindi-ready fonts (Tiro Devanagari Hindi), and India region routing built in.</p>
    </td>
  </tr>
</table>

---

## 🇮🇳 India-First Commerce

Vridhira is not a generic global storefront with INR added as an afterthought. Every layer is built for the way India shops, sells, and ships.

| Feature | Details |
|:---|:---|
| 🏦 **UPI-first Payments** | Razorpay UPI — India's dominant and fastest-growing payment method |
| 📦 **COD with OTP** | Cash on Delivery with Twilio OTP verification to cut return fraud |
| 🚛 **Shiprocket Logistics** | Integrated with India's largest D2C fulfillment and tracking network |
| ₹ **INR & GST** | ₹ currency with paisa precision and GST-inclusive display pricing |
| 🔤 **Devanagari Typography** | Tiro Devanagari Hindi for authentic Hindi product names & descriptions |
| 🏘️ **Artisan-Focused** | Small-seller UX, not enterprise admin panels — made for craft businesses |
| 🔒 **Secure & Self-Hosted** | Your data, your server, your control. No SaaS lock-in. |

---

## 🚀 Quickstart

### Prerequisites

| Requirement | Minimum Version | Notes |
|:---|:---|:---|
| Node.js | >= 20 | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| Yarn | >= 1.22 | `npm install -g yarn` |
| Vridhira Backend | Running | See [vridhira-backend](https://github.com/Newbie-Himanshu/vridhira-backend) |

### Install & Run

**1 · Clone the repo**

```bash
git clone https://github.com/Newbie-Himanshu/vridhira-frontend.git
cd vridhira-frontend
```

**2 · Install dependencies**

```bash
yarn
```

**3 · Set up environment**

```bash
cp .env.template .env.local
# Open .env.local and fill in your API keys
```

**4 · Start the dev server**

```bash
yarn dev
```

Your storefront is live at **[http://localhost:8000](http://localhost:8000)**.

> [!TIP]
> Start the Vridhira backend first — the storefront requires the API to be running. Full backend setup is in the [vridhira-backend](https://github.com/Newbie-Himanshu/vridhira-backend) repository.

---

## 💳 Payments

Vridhira ships with two payment providers, configured for Indian consumers out of the box.

| Provider | Methods | When to Use |
|:---|:---|:---|
| **Razorpay** | UPI, Cards, Netbanking, Wallets, EMI | Default for online orders — covers 95%+ of Indian payment preferences |
| **Cash on Delivery** | COD | High-conversion option for Tier 2/3 cities — OTP verification reduces fraud |

> [!NOTE]
> Razorpay keys are configured in `.env.local`. COD OTP requires a Twilio account. See [Environment Variables](#-environment-variables) below.

---

## 🔑 Environment Variables

Copy `.env.template` to `.env.local` and fill in these values:

| Variable | Required | Description |
|:---|:---:|:---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | ✅ | Backend API URL — default `http://localhost:9000` |
| `NEXT_PUBLIC_BASE_URL` | ✅ | Storefront URL — default `http://localhost:8000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | ✅ | Region code — use `in` for India |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | ✅ | Razorpay public key (from Razorpay Dashboard) |
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | ⚠️ | Algolia application ID — required only if using search |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` | ⚠️ | Algolia public search-only API key |

---

## 🗂️ Tech Stack

| Layer | Technology | Why |
|:---|:---|:---|
| Framework | [Next.js 15](https://nextjs.org) | App Router, RSC, ISR — fast by default |
| Language | [TypeScript](https://www.typescriptlang.org) | Type safety across the full stack |
| Styling | [Tailwind CSS](https://tailwindcss.com) | Utility-first with Vridhira's earthy design tokens |
| Commerce Engine | [MedusaJS v2](https://medusajs.com) | Headless, modular, open source |
| Payments | [Razorpay](https://razorpay.com) | India's most complete payment gateway |
| Logistics | [Shiprocket](https://shiprocket.in) | India's leading D2C fulfillment network |
| Search | [Algolia](https://www.algolia.com) | Instant, relevance-tuned product search |
| Package Manager | [Yarn](https://yarnpkg.com) | Fast, reliable dependency management |

---

## 📁 Project Structure

```
vridhira-frontend/
├── src/
│   ├── app/
│   │   └── [countryCode]/              ← i18n-aware routing root
│   │       ├── (main)/                 ← Public pages
│   │       │   ├── page.tsx            ← Homepage
│   │       │   ├── store/              ← Product listing
│   │       │   ├── products/[handle]/  ← Product detail
│   │       │   └── account/            ← Customer portal
│   │       └── (checkout)/             ← Checkout flow
│   │           └── checkout/           ← Cart → Shipping → Payment → Confirm
│   ├── modules/                        ← Feature modules (co-located logic)
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   ├── account/
│   │   ├── home/
│   │   └── layout/
│   │       ├── templates/footer/       ← Footer with VridhiraCredits
│   │       ├── templates/nav/          ← Navigation
│   │       └── components/
│   │           └── vridhira-credits/   ← Branding & attribution component
│   ├── lib/
│   │   ├── data/                       ← Server actions & Medusa SDK calls
│   │   └── util/                       ← Formatters, helpers, constants
│   └── styles/
│       └── globals.css                 ← Global CSS & CSS variables
├── public/                             ← Static assets
├── .env.template                       ← Environment variable template
├── tailwind.config.js                  ← Brand colours & typography tokens
└── tsconfig.json                       ← TypeScript config (es2017, bundler)
```

---

## 🔗 Related Repositories

| Repository | Description | Visibility |
|:---|:---|:---:|
| [vridhira-frontend](https://github.com/vridhira/vridhira-frontend) | This storefront — public-facing brand org repo | 🌐 Public |
| [vridhira-backend](https://github.com/Newbie-Himanshu/vridhira-backend) | MedusaJS v2 backend with all Indian commerce modules: COD, Razorpay queue, Shiprocket, Wishlist, Algolia | 🔒 Private |

---

## 📚 Resources

**Frameworks & Core**

- [MedusaJS Documentation](https://docs.medusajs.com) — The commerce engine powering Vridhira
- [Next.js Documentation](https://nextjs.org/docs) — React framework — App Router, RSC, SSR
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) — Styling system used throughout

**Integrations**

- [Razorpay Integration Docs](https://razorpay.com/docs) — Payment gateway setup & webhooks
- [Shiprocket API Docs](https://apidocs.shiprocket.in) — Fulfillment, tracking, and webhook events
- [Algolia Docs](https://www.algolia.com/doc) — Search index setup and frontend integration

---

## 🤝 Contributing

Contributions are welcome — from fixing typos to building new features.

**Steps**

1. **Fork** the repository and clone it locally
2. **Create a branch:** `git checkout -b feat/your-feature-name`
3. **Make your changes** — keep the scope focused
4. **Commit** using [Conventional Commits](https://www.conventionalcommits.org): `feat(cart): add quantity stepper`
5. **Push** your branch and open a **Pull Request** against `master`

Before submitting, run:

```bash
yarn tsc --noEmit   # TypeScript check
yarn lint           # ESLint
```

> [!TIP]
> Check existing issues before starting work on a large change — it avoids duplication and keeps the effort aligned.

---

## 🙏 Acknowledgements

Vridhira is built on the shoulders of these excellent open-source projects:

- [MedusaJS](https://medusajs.com) — headless commerce engine by [Medusa, Inc.](https://github.com/medusajs/medusa) — MIT License
- [Next.js](https://nextjs.org) — React framework by [Vercel](https://vercel.com) — MIT License
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS by [Tailwind Labs](https://tailwindlabs.com) — MIT License
- [Razorpay](https://razorpay.com) — India's payment infrastructure
- [Shiprocket](https://shiprocket.in) — India's D2C fulfillment network

---

## 📜 License

Distributed under the **MIT License** — see [LICENSE](./LICENSE) for full text.

Copyright © 2026 Himanshu — Vridhira. All rights reserved.

---

## 👤 Author

Built with ❤️ for India's artisans by **Himanshu** — independently, without commercial backing.

<p>
  <a href="https://github.com/Newbie-Himanshu">
    <img
      src="https://img.shields.io/badge/GitHub-Newbie--Himanshu-181717?style=flat-square&logo=github"
      alt="GitHub: Newbie-Himanshu"
    />
  </a>
  &nbsp;
  <a href="https://github.com/vridhira">
    <img
      src="https://img.shields.io/badge/Org-vridhira-8B4513?style=flat-square&logo=github&logoColor=white"
      alt="GitHub Org: vridhira"
    />
  </a>
</p>

<sub>Powered by <a href="https://github.com/medusajs/medusa">MedusaJS</a> — licensed separately under the MIT License by Medusa, Inc.</sub>
