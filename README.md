# TaskFerry website

Marketing site for [TaskFerry](https://github.com/smeriwether/task-ferry), a
private macOS bridge for Apple Reminders.

## Development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```sh
npm run build
npm start
```

The deployable Vinext bundle is written to `dist/`.

## Cloudflare Workers deployment

```sh
npm run deploy
```

Wrangler deploys the site as the `task-ferry-site` Worker and provisions
`taskferry.merimerimeri.com` as its custom domain.

The stable download button points to the latest signed `TaskFerry.dmg` GitHub
release asset.
