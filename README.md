# Web Hierarchy Viewer

A web based tool for inspecting UI of an in-development android app. [Launch App](https://google.github.io/web-hv)

## Development

To run the project locally, checkout the code follow the steps below. This tool only uses HTML5/javascript APIs and
doesn't have any server side component.

### Setup

Install dependencies:

```bash
npm i
```

### Dev Server

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

web-hv uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server),
see [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more
information.

### Production build

To build web-hv for production, run:

```bash
npm run build
```

This step uses [rollup.js](https://rollupjs.org/), the resulting
output can be found in the build/ subdirectory. 

To deploy to the github pages, run

```bash
npm run deploy
```

## Contributions

See CONTRIBUTING.md on how to submit patches.

## Dependencies

- [JQuery](https://github.com/jquery/jquery)
- [JavaScript-autoComplete](https://github.com/Pixabay/JavaScript-autoComplete)
- [JSZip](http://stuartk.com/jszip)
- [pako](https://github.com/nodeca/pako)
- [jsbn](http://www-cs-students.stanford.edu/~tjw/jsbn/)

## Features

- Inspect ui of running apps (debug apps)
- Run commands on view nodes and change properties at runtime
- Save hierarcy to disk for offline viewing and sharing

This is not an officially supported Google product
