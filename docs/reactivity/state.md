# Reactivity / Signals (State)

To create a reactive variable, we use `useSignal()`

`useSignal` create a structure:

```ts
// T = Signal value type
// K = Processed Signal value type
interface ISignal<T, K = T> {
  value: T; // Signal value
  readonly asRaw: K; // Processed Signal value to render
  readonly unsafe: T; // Using for specific logic where need null checking
}
```

Counter example:

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'
import { useSignal } from 'horizon-core/state'

const MainComponent = comp((_, { $, text }) => {
  // Define reactive variable: counter, with initial value 0
  const counter = useSignal(0);

  $('button', { "@click"() { counter.value++ } }, () => {
    // Text builder
    text(() => `Counter: ${counter}`);
  });
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'
import { useSignal } from 'horizon-core/state'

const MainComponent = comp((props, canvas) => {
  // Define reactive variable: counter, with initial value 0
  const counter = useSignal(0);

  canvas.$('button', { "@click"() { counter.value++ } }, () => {
    // Text builder
    canvas.text(() => `Counter: ${counter}`);
  });
});
```
:::

::: tip How it works:
When a reactive variable is created, a `Signal context` is created to allow the `Observer pattern` to be realized. When `text()` is called through the arrow function, a builder is created that listens for `Signal context` and observes for changes, the DOM object text is not recreated, only the `innerHTML` property is changed.

This allows for faster redrawing of content, without going through the VDOM
:::

## Processing of value

The `Signal` capabilities allow you to customize content, before rendering globally for a value

```ts{2-4}
const counter = useSignal(0, {
  asRaw(v) {
    return `Counter: ${v}`
  },
});
```

Update example:

:::code-group
```ts [Regular view]{5-9,12}
import { comp } from 'horizon-core/component'
import { useSignal } from 'horizon-core/state'

const MainComponent = comp((_, { $, text }) => {
  const counter = useSignal(0, {
    asRaw(v) {
      return `Counter: ${v}`
    },
  });

  $('button', { "@click"() { counter.value++ } }, () => {
    text(counter);
  });
});
```

```ts [Clearly view]{5-9,12}
import { comp } from 'horizon-core/component'
import { useSignal } from 'horizon-core/state'

const MainComponent = comp((props, canvas) => {
  const counter = useSignal(0, {
    asRaw(v) {
      return `Counter: ${v}`
    },
  });

  canvas.$('button', { "@click"() { counter.value++ } }, () => {
    canvas.text(counter); // Automatically unpack value
  });
});
```
:::

::: tip Also:
`asRaw` can return any value, but for correct display, it is desirable to return a string
:::

## Event Tracking

When creating a `Signal`, you can assign event tracking (`onInit`, `onSet`)\
This allows to realize different schemes of working with data through a single object

Example with localStorage:

:::code-group
```ts [Normal saving]
import { useSignal } from 'horizon-core/state'

const appSettings = useSignal({}, {
  onInit(signal) {
    signal.value = JSON.parse(localStorage.getItem("app_settings") ?? "null") 
      ?? signal.value;
  },
  onSet(value) {
    localStorage.setItem("app_settings", JSON.stringify(value));
  }
});
```

```ts [Deep changes saving]
import { useSignal, watch } from 'horizon-core/state'

const appSettings = useSignal({}, {
  onInit(signal) {
    watch(signal, () => {
      localStorage.setItem("app_settings", JSON.stringify(signal.value));
    }, { deep: true });

    signal.value = JSON.parse(localStorage.getItem("app_settings") ?? "null") 
      ?? signal.value;
  }
});
```
:::

::: warning Warning!
This example is not necessary to implement, there are already ready variants of work with data

See below
:::

## Static (Global) signal

It is also possible to create a static (global) signal for your needs

::: warning Warning!
It is better to use, in your functions that take data by key, in order to reduce code repetitions, this tool is made to improve performance
:::

```ts{5}
import { useSignal } from 'horizon-core/state'

// Static reactive variable
const myData = useSignal(null, {
  key: "your_key" // A unique key for static
});
```

::: tip How it works:
The `key` is unique. The `Signal` is saved by this `key`, and then it is retrieved by this `key` when trying to create another one
:::

## Unsafe working

Often you need to work with real data, so `Signal` has an `unsafe` property that returns the data in its original form

```ts
import { useSignal } from 'horizon-core/state'

const userId = useSignal(null)

console.log(userId.value)
// "null" as string

console.log(userId.unsafe)
// null as object
```

::: tip How it works:
To reduce different errors, `value` returns (undefined/null) as text “null”, this allows to create a link between the signal and the node
:::

::: warning `unsafe` is readonly property!
 
:::

## Observation of Signal

Monitoring of `Signal`, independent of Event Tracking. It is realized through the `watch` function, which allows to watch both the whole `Signal` and its parts, if `Signal` is an object.

:::code-group
```ts [Signal watching]
import { useSignal, watch } from 'horizon-core/state'

const counter = useSignal(0);

const stopWatch = watch(counter, (newValue) => {
  console.log(newValue);
});

counter.value++;
// log: 1

counter.value = 999;
// log: 999

stopWatch();
```

```ts [Signal object watching]
import { useSignal, watch } from 'horizon-core/state'

const userData = useSignal({ 
  lastName: "Testov",
  firstName: "Test",
});

const stopWatch = watch(userData, (newValue) => {
  console.log(newValue);
}, { deep: true });

userData.firstName = "None";
// log: { lastName: "Testov", firstName: "None" }

userData.middleName = "Testovich";
// log: { lastName: "Testov", firstName: "None", middleName: "Testovich" }

stopWatch();
```

```ts [Part of Signal object watching]
import { useSignal, watch } from 'horizon-core/state'

const userData = useSignal({ 
  lastName: "Testov",
  firstName: "Test",
});

const stopWatch = watch(userData.value.firstName, (newValue) => {
  console.log(newValue);
});

userData.firstName = "None";
// log: "None"

userData.middleName = "Testovich";

stopWatch();
```
:::

::: warning Limitations (Part of Signal object watching)
Observing an object property, `Signal` works by binding the actual value, so when the value is deleted, the watch loses context. So be careful

Still studying how it can be avoided without a strong performance cost
:::

## Working with DOM

To work with components, and DOM rendering, we have several possibilities:

* Redrawing content when the signal changes
* Point replacement of DOM object properties
* Changing content in `innerHTML` (for `text()`)

### Redrawing content when the signal changes

:::code-group
```ts [Article Store]
import { useSignal } from 'horizon-core/state'

const articles = useSignal([]);

const addArticle = () => articles.push({
  title: prompt("Title: "),
  content: prompt("Content: "),
});

export default {
  articles,
  addArticle
};
```

```ts [Article Component]
import { comp } from 'horizon-core/component'

export default comp((props, { $, text }) => {
  const { title, content } = props;

  $('article', {}, () => {
    $('h2', {}, () => text(title));
    $('p',  {}, () => text(content));
  });
});
```
:::

```ts
import { comp } from 'horizon-core/component'
import ArticleComponent from '@/components/ArticleComponent'
import Articles from '@/store/ArticleStore'

const MainComponent = comp((_, { $, use }) => {
  const { articles, addArticle } = Articles;  

  $('section', { "#watching": [articles] }, () => {
    for(const article of articles.value) {
      use(ArticleComponent, { ...article });
    }
  });

  $('button', { "@click": addArticle }, () => {
    text("Add article");
  });
})
```

::: tip How it works:
When we in the `MainComponent` component. Create `$` SectionDOM. We specify the parameter `#watching`. This parameter is responsible for calling the redrawing, of the internal content
:::

### Point replacement of DOM object properties:

```ts
import { comp } from 'horizon-core/component'
import { useSignal } from 'horizon-core/state'

const MainComponent = comp((_, { $, use }) => {
  const containerColor = useSignal("blue");

  $('section', { "style": () => `color: ${containerColor}` }, () => {
    text("content...");
  });

  $('button', { "@click"() { containerColor.value = "red"; } }, () => {
    text("Change container color");
  });
})
```
::: tip How it works:
When we in the `MainComponent` component. Create `$` SectionDOM. We specify the `style` parameter. In this parameter we put an arrow function, this function is a computable assembler. Which monitors the usage of `Signal` and listens when the value changes. And make it calculate a new value for `style`.
:::

### Changing content in `innerHTML` (for `text()`)

```ts
import { comp } from 'horizon-core/component'
import { useSignal } from 'horizon-core/state'

const MainComponent = comp((_, { $, use }) => {
  const date = useSignal(new Date().toLocaleString());

  $('section', {}, () => {
    text(() => `Current date: ${date}`);
  });

  $('button', { 
    "@click"() { date.value = new Date().toLocaleString(); }
  }, () => {
    text("Update date");
  });
})
```

::: tip How it works:
The principle of operation is similar to Point replacement of DOM object properties. Only the `innerHTML` property is changed.
:::

## Trigger

`Trigger` is a hook that allows you to track actions to a command

```ts
import { comp } from 'horizon-core/component'
import { useTrigger } from 'horizon-core/composables'

const MainComponent = comp((_, { $, use }) => {
  const redrawTrigger = useTrigger(() => {});

  $('section', { '#watching': [redrawTrigger] }, () => {
    text(`Date: ${new Date()}`);
  });

  $('button', { "@click"() { redrawTrigger.trigger(); } }, () => {
    text("Update date");
  });
})
```

::: info Guidelines:
`useTrigger` will be more appropriate in some cases, to handle multiple data processes. It also reduces the amount of content redrawing (when using `#watching`).
:::

## LocalStorage

`LocalStorage` to work, with data storage on the client, you can use `useLocalStorage`

```ts
import { useLocalStorage } from 'horizon-core/composables'

const isDarkTheme = useLocalStorage<boolean>(
  "dark-theme", 
  { defaultValue: false }
);

console.log(isDarkTheme.value);
// false
```

::: tip Server Side Rendering:
`useLocalStorage` is safety to use in server (but not working on server)
:::

## SessionStorage

`SessionStorage` to work, with data storage on the client on session lifetime, you can use `useSessionStorage`

```ts
import { useSessionStorage } from 'horizon-core/composables'

const isDarkTheme = useSessionStorage<boolean>(
  "dark-theme", 
  { defaultValue: false }
);

console.log(isDarkTheme.value);
// false
```

::: tip Server Side Rendering:
`useSessionStorage` is safety to use in server (but not working on server)
:::