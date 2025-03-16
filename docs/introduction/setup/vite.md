# Setup / Vite

::: warning Easy creation tool in Development
In the future, the project creation process can be simplified
:::


## Installing Vite

To create a Horizon project and Vite. In the terminal, insert this command, which will create the Vite App

::: code-group
```bash [npm]
npm create vite@latest my-app -- --template vanilla-ts
```

``` bash [yarn]
yarn create vite@latest my-app -- --template vanilla-ts
```

``` bash [pnpm]
pnpm create vite@latest my-app -- --template vanilla-ts
```
:::

Then go to the project folder and download the dependencies

::: code-group
```bash [npm]
cd my-app;
npm i;
```

``` bash [yarn]
cd my-app;
yarn install
```

``` bash [pnpm]
cd my-app;
pnpm install
```
:::

[More about vite configuration](https://vite.dev/guide/)

## Installing Horizon

Then we install the Horizon package

::: code-group
```bash [npm]
npm i horizon-core
```

``` bash [yarn]
yarn add horizon-core
```

``` bash [pnpm]
pnpm add horizon-core
```
:::

## Configuring Vite to Horizon CSR

Go to the path `src/main.ts`.

And replacing the content with:

```ts
import { defineApp } from 'horizon-core'
import { comp } from 'horizon-core/component'

const app = defineApp({});

const MainComponent = comp((_, { text }) => {
  text("Horizon app working");
});

// @ts-ignore
MainComponent.composable.dom = document.querySelector('#app');
app.renderDOM(MainComponent);
```

## Project structure

The rest of the files can be deleted, you should be left with this structure:

```dir
app/
    - index.html
    - .gitignore
    - package.json
    - package-lock.json
    - tsconfig.json
    - vite.config.ts
    - src/
        - main.ts
    - public/
        - ...
    - node_modules/
        - ...
```

## Dev launch

To start the project in Dev mode we use the commands

::: code-group
```bash [npm]
npm run dev
```

``` bash [yarn]
yarn dev
```

``` bash [pnpm]
pnpm dev
```
:::


## Prod launch

To start the project in Prod mode we use the commands

::: code-group
```bash [npm]
npm run build;
npm run preview
```

``` bash [yarn]
yarn build;
yarn preview
```

``` bash [pnpm]
pnpm build;
pnpm preview
```
:::