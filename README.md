# Welcome to Amazin' Amazim Storybook

## A React Amazon (& Netflix & ...) Clone Project

## What is Storybook?

Storybook is a tool for UI development. It makes development faster and easier by isolating components.
This allows you to work on one component at a time. You can develop entire UIs without needing to start up a complex dev stack, force certain data into your database, or navigate around your application.

## What is [Amazin' Amazim Storybook][amazin-story]

This is the collection of components that I wrote for [amazim.store][amazim], includes

- Buttons
- Input
- Rating
- Pagination
- MessageBox
- Cards
- And more to come ..

[https://ntrix.github.io/amazin-story/][amazin-story] or [https://amazin-story.vercel.app/][amazin-story-vercel]

## What is Amazim?

This is not only an online shop/platform/clone of Amazon, Netflix or something else built with a js-framework,
but also a long term example experimenting some **modern**, **real-world**, **maybe unstable** React APIs, Nx, Mobile friendly PWA and also some Backend technologies in my spare time.

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
- [Vercel][vercel]

### Backend Stack

![Tech Stack Backtend][stackbe]

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
[heroku]: https://www.heroku.com/

## Working application

### Live demo, PWA, QR code

| **[amazim.store][amazim]**   | **[amazin.ntien.com][amazin]**   |
| ---------------------------- | -------------------------------- |
| ![amazim.store QR][qramazim] | ![amazin.ntien.com QR][qramazin] |

![Amazon Clone built with React and Node][demo]

### Source code

Frontend: [github.com/ntrix/amazin][fenx]

Frontend (old version): [github.com/ntrix/amazin/tree/org-cra][fev1]

Backend: [github.com/ntrix/amazin-be][bev1]

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
| 02a  | Frontend v1: [Source][fev1], [React][react], [Redux][redux]       | Done     |
| 02b  | Frontend Deploy: [Vercel][vercel]                                 | Done     |
| 03a  | Frontend v3: [Source][fenx], Migration to [Nx][nx]                | Done     |
| 03b  | [Testing in React][testing]                                       | Doing    |
| 03c  | E2E testing with [Cypress][cy]                                    | **Todo** |
| 04   | Performance & Experiment some [unstable React API][reactapi]      | Done     |
| 05a  | [AWS Cloud Backend?][aws]                                         | **Todo** |
| 05b  | Backend [DB cache][redis]                                         | Doing    |
| 06   | AB Testing, Error Tracing [(React Profiler?)][profiler]           | **Todo** |
| ..   | ..                                                                | ..       |
| 09a  | [StoryBook UI Components][storybook], isolate UI/UI libs          | Done     |
| 09b  | [Documentation][mdx]                                              | Doing    |
| 09c  | Migration to TypeScript                                           | **Done** |

[atlas]: https://www.mongodb.com/cloud/atlas
[bev1]: https://github.com/ntrix/amazin-be
[fev1]: https://github.com/ntrix/amazin/tree/org-cra
[fenx]: https://github.com/ntrix/amazin
[testing]: https://testing-library.com/
[reactapi]: https://reactjs.org/docs/concurrent-mode-suspense.html
[storybook]: https://storybook.js.org/
[cy]: https://www.cypress.io/
[swagger]: https://swagger.io/
[stackfe]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/nx-react-cy-redux-swiper-vercel-1000.png
[stackbe]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/mongo-express-react-node-atlas-mongoose-heroku-1000.png
[amazim]: https://amazim.store/
[amazin]: https://amazin.ntien.com/
[aws]: https://aws.com/
[redis]: https://redis.com/
[profiler]: https://reactjs.org/docs/profiler.html
[mdx]: https://mdxjs.com/
[qramazim]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/qrcode.amazim.store.png
[qramazin]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/qrcode.amazin.ntien.com.png
[amazin-story]: https://ntrix.github.io/amazin-story/
[amazin-story-vercel]: https://amazin-story.vercel.app/
[demo]: https://raw.githubusercontent.com/ntrix/amazin/nx/apps/amazin/src/stories/img/amazim-react-demo-ntien.gif

## Code Climate

[![Maintainability](https://api.codeclimate.com/v1/badges/c63323239801d458e190/maintainability)](https://codeclimate.com/github/ntrix/amazin/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/c63323239801d458e190/test_coverage)](https://codeclimate.com/github/ntrix/amazin/test_coverage)

## Nx Amazin' Amazim Store

This project using [Nx](https://nx.dev).

![nx-logo](https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png)

🔎 **Smart, Extensible Build Framework**
