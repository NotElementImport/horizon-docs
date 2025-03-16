# Components / Inline Components

`Inline Components`, is similar to regular `Components`. It only differs in the principle of inserting a component into another component. `Inline Components` cannot be called for rendering via `use()` or be the main component for rendering

Example `Inline Components`:

:::code-group
```ts [Regular view]
import { mod } from 'horizon-core/component'

export const InlineComponent = mod((_, { text }) => {
  text("I'm Inline Component!");
});
```

```ts [Clearly view]
import { mod } from 'horizon-core/component'

export const InlineComponent = mod((props, canvas) => {
  canvas.text("I'm Inline Component!");
});
```
:::

Usage in other component:

```ts [Regular view]
import { InlineComponent } from './components/InlineComponent'
import { comp } from 'horizon-core/component'

const MainComponent = comp((_, { text }) => {
  InlineComponent();
});
```