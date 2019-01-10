# Sweetgreen store locator

Adapts the [Mapbox store locator demo](https://www.mapbox.com/help/tutorials/building-a-store-locator/) for a React, typescript, and less environment.

Uses [Uber's react-map-gl](https://uber.github.io/react-map-gl/#/) instead of vanilla Mapbox, and [Palantir's Blueprint](https://blueprintjs.com/docs/) for React components and styling.

Initial boilerplate app from [react-app-boilerplate](https://github.com/crazytoucan/react-app-boilerplate) by [@crazytoucan](https://github.com/crazytoucan).

## Installing and running the app

```
$ git clone git@github.com:kendraknittel/sweetgreen-store-locator.git
$ yarn
$ yarn start
# navigate to http://localhost:8080
```

## Mapbox setup

If you do not already have one, create a [Mapbox account](https://www.mapbox.com/account/). Generate a Mapbox API token and paste into the following line in `src/components/Map.tsx`:

```
const MAPBOX_TOKEN = ""; // Set your mapbox token here
```
