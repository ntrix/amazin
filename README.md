# Welcome to Amazin' Amazim Store

[![CI](https://github.com/ntrix/amazin/actions/workflows/test.yml/badge.svg)](https://github.com/ntrix/amazin/actions/workflows/test.yml)
[![codecov](https://codecov.io/github/ntrix/amazin/branch/nx/badge.svg)](https://codecov.io/github/ntrix/amazin)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ntrix_amazin&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ntrix_amazin)
<a href="https://sonarcloud.io/summary/new_code?id=ntrix_amazin"><img src="https://sonarcloud.io/images/project_badges/sonarcloud-highlight.svg" alt="SonarQube Cloud" height="20"></a>

## A React Amazon (& Netflix & ...) Clone Project

This is not only an online shop/platform/clone of Amazon, Netflix or something else built with a js-framework,
but also a long term example experimenting some **modern**, **real-world**, **maybe unstable** React APIs, Nx, Mobile friendly PWA and also some Backend technologies in my spare time.

## Live demo, PWA, QR code

| **[amazim.netlify.app][amazim]**   | **[amazin.tiennguyen.de][amazin]**   |
| ----------------------------------- | ------------------------------------- |
| ![amazim.netlify.app QR][qramazim] | ![amazin.tiennguyen.de QR][qramazin] |

![Amazon Clone built with React and Node demo Nav Currency Search Suggest Category Filter][nav currency search suggest category filter]

### Search & UI/UX details that feel like the real thing

- **Search-suggest**: type any letters in order (not just a prefix) and the nav search bar filters live as you type — matches highlighted inline, ranked so the tightest match rises to the top, fully keyboard-navigable (`↑`/`↓`, `Enter`, `Esc`) — same interaction pattern as Amazon's own search box
- **Sidebar**: opens with a spring-style overshoot easing (`cubic-bezier` > 1) — slides past its resting position and settles back, not a plain linear slide
- **Nav bar**: every segment (logo, search, dropdowns, cart) gets a highlighted border on hover/focus, matching Amazon's own nav affordance
- **Netflux (video screen)**: hovering a movie card expands it over its neighbors, Netflix-style; trailers play from real YouTube (`react-youtube` + auto-search by title, with a graceful fallback)
- **Currency switcher**: real country-flag sprites and a live exchange-rate reference link — and it actually reprices every product shown, not just the dropdown
- **Accessibility**: `aria-label`/`role`/`tabIndex` throughout the interactive nav elements, full keyboard navigation (arrows, Enter, Escape)
- **One shared state governs every overlay** (sidebar, dropdowns, search-suggest) via Context — opening one closes the others automatically, avoiding overlapping-overlay bugs, debounced for smooth toggling
- **Installable as a mobile app** (`manifest.json`, home-screen icon) — offline caching scaffolded via service worker but not yet populated, so call it semi-PWA
- Also a small Easter egg on invalid routes — a 404 page with a bit of personality

### Frontend architecture worth a second look

- **Hand-rolled Suspense resource cache** (`apis/suspenseAPI.tsx`) — implements the throw-a-pending-promise contract Suspense itself relies on, so every image is preloaded exactly once app-wide, not just wrapped in `React.lazy`
- **A homemade "RTK Query" precursor** (`axiosClient.ts`'s `axiosRedux` + `ReduxToolKitClient.ts`) — one factory generates the `_REQUEST/_SUCCESS/_FAIL` thunk and reducer for every slice, replacing what would otherwise be near-duplicated boilerplate across cart/order/product/user
- **Hover *and* focus prefetch on category nav** — data loads before the click, debounced so a fast mouse sweep doesn't fire a dozen requests, and wired to `onFocus` too so keyboard users get the same perceived-performance boost
- **Per-route resilience**: code-splitting with prefetch hints, an error boundary around every route so one screen failing can't take down the app, and skeleton loaders shaped like the real content instead of a generic spinner
- **Declarative, data-driven form validation** (`validateRules.ts`) — every field is a `[message, regex]` table row, not imperative per-field code, so adding a new validated field never touches the validation logic itself

### Features

- Authenticate users via JWT (login, register, logout button on settings page)
- Sort, Search, Nav, Side Nav, Sub Nav Categories, Search Filter, Search Suggest, Pagination, Multi Currencies, Map Location, Payment, Customer Contact Form, User Profile Update, Validations (Both Backend & Frontend Side)
- Management of Content (Images, Videos), Products, Users, Orders:
- _CRUD User(s) (sign up & settings page)_
- _CRUD Product(s)_
- _CRUD Orders(s)_
- _CRUD Reviews of Product (no updating required)_
- _GET and display filtered paginated lists of articles_
- _Backoffice (as Admin/Seller) User and Product-catalogues Management_
- Amazon’s style UI, responsive, cross browser, PWA ready
- And more ..

## Tech stack: MERN & Co

### Frontend Stack

![Tech Stack Frontend][stackfe]

- [Nx CLI][nx]
- [React JS][react]
- [Redux][redux]
- [Cypress][cy]
- UI modules:
  - [Swiper][swiper]
  - ...
- [Netlify][netlify]

### Backend Stack

![Tech Stack Backend][stackbe]

- [Node JS][node]
- [Express JS][express]

- [Mongo DB][mongo]
- [Mongoose][mongoose]
- [Mongo DB Atlas][atlas]
- [Heroku][heroku]
- [optional AWS][aws]

[nx]: https://nx.dev/
[react]: https://reactjs.org/
[redux]: https://redux.js.org/
[swiper]: https://swiperjs.com/
[node]: https://nodejs.org/
[express]: https://expressjs.com/
[mongo]: https://www.mongodb.com/
[mongoose]: https://mongoosejs.com/
[vercel]: https://vercel.com/
[netlify]: https://www.netlify.com/
[heroku]: https://www.heroku.com/
[render]: https://render.com/
[codecov]: https://codecov.io/
[sonar]: https://sonarcloud.io/

## Test Coverage

Unit tests now run on every push/PR via GitHub Actions, with coverage reported to Codecov (badges at the top of this page). Previously reported to Code Climate, which shut down its Test Coverage product in 2025.

- 30 new test files (156 tests total), plus 2 pre-existing tests fixed (silent regressions that had gone unnoticed for lack of CI)
- Jest now runs consistently both via `nx test` and directly from the IDE
- ~51% line coverage

Organized around a Clean Architecture-style 4-layer split (Presentation → Application → Domain → Infrastructure):

| Layer | Covers | Test files |
| ----- | ------ | ---------- |
| 1. Presentation — screens, components, route guards | Sign in/up, contact, shipping, currency forms; `Rating`, `Pagination`, `MessageBox`, `BaseTable`; `PrivateRoute`/`SellerRoute`/`AdminRoute` auth guards | `SigninScreen`, `RegisterScreen`, `ContactScreen`, `ShippingAddressScreen`, `CurrencyScreen`, `Rating`, `Pagination`, `MessageBox`, `BaseTable`, `PrivateRoute`, `SellerRoute` |
| 2. Application — hooks orchestrating business logic | Debouncing, DOM portals, nav-search keyboard handling | `useDebounce`, `useDoThenDebounce`, `usePortal`, `useKeyInput`, `useSafeState` |
| 3. Domain — Redux slices (app state) | Cart/user reducers, the generic reducer factory shared by every slice | `CartSlice`, `UserSlice`, `ReduxToolKitClient` |
| 4. Infrastructure — data access / thunks | The shared `axiosRedux` thunk factory, and every REST endpoint wrapper | `axiosClient`, `userAPI`, `cartAPI`, `orderAPI`, `productAPI`, `suspenseAPI` |
| Shared utilities (used across all 4 layers) | Form validation, search ranking, currency formatting, image URLs | `validate`, `debounce`, `findSuggest`, `currencyPipe`, `throttle`, `getImgUrl`, `shortName`, `savePath` |

## Demo

### Sort, Filter, Search, Nav, SideNav

![Sort Filter Search Nav SideNav][sort-filter-search-nav-side-nav]

### Screen, SubNav, SearchFilter, Pagination

![Screen SubNav SearchFilter Pagination][screen-sub-nav-search-filter-pagination]

### Responsive any size

![Responsive][responsive]

### Currency, Shipping, Payment, Contact, Profile, Validate

![Currency Shipping Payment Contact Profile Validate][currency-shipping-payment-contact-profile-validate]

### Content, Management, Product, Image, User, Order

![Content Management Product Image User Order][content-management-product-image-user-order]

[content-management-product-image-user-order]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/gif/Content%20Management%20Product%20Image%20User%20Order.gif
[currency-shipping-payment-contact-profile-validate]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/gif/Currency%20Shipping%20Payment%20Contact%20Profile%20Validate.gif
[responsive]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/gif/Responsive.gif
[screen-sub-nav-search-filter-pagination]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/gif/Screen%20SubNav%20SearchFilter%20Pagination.gif
[sort-filter-search-nav-side-nav]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/gif/Sort%20Filter%20Search%20Nav%20SideNav.gif

## Preview video

[![Preview video on youtube](https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/preview-video-on-youtube.png)](https://www.youtube.com/watch?v=7GNQKYdpDHQ)

## Learning by Doing

**"Divide to conquer"** - Lao Tsu (604-531 BC).

When I look at the application, it is **huge**. When the task is huge, you usually don't know how to start working with them.
I had to break the big task into smaller parts, do it step by step and enjoy learning.

Yes, **Learning by Doing** that's my approach. If you see a long path ahead, don't heap or run or give up, just divide the path(process) to steps and make (conquer) the first one, and then another one.
I learned a lot of stuff, also renew and update my knowledge just by doing. You might too have a curiosity about the process of building the same scale app as well, but just let's do it.

| Part | Description                                                       | Status   |
| ---- | ----------------------------------------------------------------- | -------- |
| 01a  | Database: [Mongo DB][mongo], [Mongoose][mongoose], [Atlas][atlas] | Done     |
| 01b  | Backend v1: [Source][bev1], [Node][node], [Express][express]      | Done     |
| 01c  | Backend Deploy: [Heroku][heroku] / Firebase                       | Done     |
| 01d  | Heroku account deleted (long inactivity) → migrated to Cyclic.sh (serverless) | Done     |
| 01e  | Cyclic.sh shut down (2024) → migrated to [Render][render] (free tier) | Done     |
| 01f  | Backend fixes on Render — full detail in [amazin-be][bev1]        | Done     |
| 02a  | Frontend v1: [Source][mvp1], [React][react], [Redux][redux]       | Done     |
| 02b  | Frontend Deploy: [Vercel][vercel]                                 | Done     |
| 02c  | Vercel disabled → migrated to [Netlify][netlify]                  | Done     |
| 03a  | Frontend v3: [Source][fenx], Migration to [Nx][nx]                | Done     |
| 03b  | [Testing in React][testing]: unit tests (utils, redux, hooks, screens) + CI on push/PR | Done     |
| 03c  | E2E testing with [Cypress][cy]:<br>- purchase flow (register → browse → cart → checkout → order)<br>- seller flow (register → seller verification → create product) | Done     |
| 03d  | Code quality tooling: [Codecov][codecov] (coverage, replacing Code Climate — shut down 2025) + [SonarQube Cloud][sonar] (code smells, replacing DeepSource) | Done     |
| 04   | Performance & Experiment some [unstable React API][reactapi]      | Done     |
| 05a  | ~~[AWS Cloud Backend?][aws] (no free tier anymore)~~ — use Render instead | Done     |
| 05b  | Backend [DB cache][redis]                                         | Doing    |
| 06   | AB Testing, Error Tracing [(React Profiler?)][profiler]           | **Todo** |
| ..   | ..                                                                | ..       |
| 09a  | [StoryBook UI Components][storybook], isolate UI/UI libs          | Done     |
| 09b  | [Documentation][mdx]                                              | Doing    |
| 09c  | Migration to TypeScript                                           | **Done** |

[atlas]: https://www.mongodb.com/cloud/atlas
[bev1]: https://github.com/ntrix/amazin-be
[mvp1]: https://github.com/ntrix/amazin/tree/org-cra
[fenx]: https://github.com/ntrix/amazin
[testing]: https://testing-library.com/
[reactapi]: https://reactjs.org/docs/concurrent-mode-suspense.html
[storybook]: https://storybook.js.org/
[cy]: https://www.cypress.io/
[swagger]: https://swagger.io/
[stackfe]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/nx-react-cy-redux-swiper-vercel-1000.png
[stackbe]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/mongo-express-react-node-atlas-mongoose-heroku-1000.png
[amazim]: https://amazim.netlify.app/
[amazin]: https://amazin.tiennguyen.de/
[aws]: https://aws.com/
[redis]: https://redis.com/
[profiler]: https://reactjs.org/docs/profiler.html
[mdx]: https://mdxjs.com/
[qramazim]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/qrcode.amazim.netlify.app.png
[qramazin]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/qrcode.amazin.tiennguyen.de.png
[amazin-story]: https://ntrix.github.io/amazin-story/
[amazin-story-vercel]: https://amazin-storybook.vercel.app/
[nav currency search suggest category filter]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/gif/Nav%20Currency%20Search%20Suggest%20Category%20Filter.gif

## Source code

Frontend: [github.com/ntrix/amazin][fenx]

Frontend (old version, MVP Frontend & Backend): [github.com/ntrix/amazin/tree/org-cra][mvp1]

Backend: [github.com/ntrix/amazin-be][bev1]

## Storybook

[Amazin' Amazim Storybook][amazin-story] is the isolated UI component library behind this app (Buttons, Input, Rating, Pagination, MessageBox, Cards, ...), browsable at [ntrix.github.io/amazin-story][amazin-story] or [amazin-storybook.vercel.app][amazin-story-vercel].

## Nx Amazin' Amazim Store

This project using [Nx](https://nx.dev).

![nx-logo](https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png)

🔎 **Smart, Extensible Build Framework**

🔎 **How to run this project**

Have your Nx CLI installed:
`npm install -g nx`

Add `SKIP_PREFLIGHT_CHECK=true` to `.env` if needed

`npm start`
