<a href="https://pubg.th.gl/" target="_blank"><img src="./.github/logo.png" alt="Trophy Hunter" align="right" height="40" /></a>

# Trophy Hunter PUBG

Earn trophies while playing PlayerUnknown's Battlegrounds (PUBG), view information about your teammates and opponents and meet other hunters to play with.

[Trophy Hunter](https://pubg.th.gl/) is available on [Overwolf](https://www.overwolf.com/).

## Table of content

- [Download](#download)
- [Features](#features)
- [Develop](#develop)
  - [App](#app)
  - [API](#api)
- [Contribute](#contribute)

## Download

You can download the app from the Overwolf App Store soon.

## Features

- Rich stats for every PUBG player including rank, KDA, accuracy and more
- Challenging achievements/trophies

## Develop

Trophy Hunter PUBG is based on [Next.js](https://nextjs.org/) and [Zeit Now](https://zeit.co/docs). The [app](#app) project shares the code for the [web app](https://pubg.th.gl/) and the Overwolf app. The [API](#api) is the backend of Trophy Hunter and access the PUBG API.
You need to configure both projects environments.

The project requires Typescript, ESLint and Prettier. Please install top level dependencies first:

```sh
yarn install
```

### App

Please follow the instructions on [Overwolf Developer](http://developers.overwolf.com/documentation/odk-2-0-introduction/creating-your-first-app/) to get white listed, otherwise you can not install custom apps in Overwolf.

First, change to `packages/app` directory.

```sh
cd packages/app
```

Now create `development.env` for your environemnts. You can use `template.env` as template. For production build, `production.env` is required.

Install dependencies:

```sh
yarn install
```

Run web app :

```sh
yarn dev
```

Or export Overwolf app:

```sh
yarn export
```

The Overwolf app is exported to `packages/app/out` directory.

### API

You need to get your own PUBG API key on [PUBG Developer Portal](https://developer.playbattlegrounds.com/).

Go to `packages/api` directory and create `.env` file based on `template.env`.

Install dependencies:

```sh
yarn install
```

Run API:

```sh
yarn dev
```

## Contribute

Contributions are always welcome! Please contact me in [Discord](https://discord.gg/8NEYhR).
