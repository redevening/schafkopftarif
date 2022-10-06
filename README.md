[![Netlify Status](https://api.netlify.com/api/v1/badges/392e5d25-ce7a-4273-ade8-58dd65440e8a/deploy-status)](https://schafkopftarif.de)

# [Schafkopftarif.de](https://schafkopftarif.de)

Schafkopftarif is a simple Web App that allows Schafkopf (Card Game) Offline Players to register their plays without relying on Pen and Paper.
It automatically aggregates current earnings for each player.

<p>
  <img src="/docs/start.png" width="100" />
  <img src="/docs/newGame.png" width="100" />
  <img src="/docs/overview.png" width="100" /> 
  <img src="/docs/play.png" width="100" />
</p>

## Technology

- The App is built using [SVELTE](https://svelte.dev/) as frontend framework.
- Data is persisted using [Firebase Firestore](https://firebase.google.com). Offline Support and realtime updates are enabled.
- The app is hosted via [Netlify](https://www.netlify.com/)
- The app can be installed as Progressive Web App on Android and iOS directly from the browser

## Building

- To build the app you need a valid firebase config with API Key, etc.
- If you don't have it create an account at the firebase [console](https://console.firebase.google.com).
- Copy the `.env.copy` into the `.env` file and fill it with your credentials. The variables are used in `src/main.js`
