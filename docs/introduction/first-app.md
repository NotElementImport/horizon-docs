# Introduction / First app

To create a simple application, we need to create a `Horizon Contenxt` and a main component.

Let's create a simple application with “Hello world”

:::code-group

```ts [CSR (Client render)]
import { defineApp } from 'horizon-core'
import { comp } from 'horizon-core/component'

// Creating Horizon Context
const app = defineApp();

// Creation Main Component
const MainComponent = comp((_, { text }) => {
  text("Hello world!");
});

// Set parent to append render
mainComponent.composable.dom = document.body; // <body> is parent

// Render to client
app.renderDOM(mainComponent);
```

```ts [SSR (Server render)]
import { defineApp } from 'horizon-core'
import { comp } from 'horizon-core/component'

// Creating Horizon Context
const app = defineApp();

// Creation Main Component
const MainComponent = comp((_, { text }) => {
  text("Hello world!");
});

// Print component
console.log(await app.renderSSR(MainComponent));
// Output: <span hash="$0txt">Hello world!</span>
```

:::