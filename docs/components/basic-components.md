# Components / Creating Components

Components in Horizon are implemented through the function:

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const MyComponent = comp((_, { text }) => {
  text("I'm display text!");
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const MyComponent = comp((props, canvas) => {
  canvas.text("I'm display text!");
});
```
:::

We get an analog of the code in html:

```html
<span>I'm display text!</span>
```

## Possibilities

Components, these are the widgets of the application. Components create the UI of the application.

In components, you can implement all JS logic, typically

::: code-group
```ts [Objects]
import { comp } from 'horizon-core/component'

const UserInfoComponent = comp((_, { text }) => {
  const user = {
    name: "Ryan Gosling",
    age: 32
  };

  text(`My name is ${user.name}, i'm ${user.age} years old!`);
});
```

```ts [If statement]
import { comp } from 'horizon-core/component'

const GuessNumberComponent = comp((_, { text }) => {
  const randomGame = Math.floor(Math.random() * 12)

  if(randomGame == +prompt("Choise number 0 - 11: ")) {
    text("You win");
  }
  else {
    text("You lose")
  }
});
```

```ts [For loop]
import { comp } from 'horizon-core/component'

const RepeatComponent = comp((_, { text }) => {
  for(let i = 0; i < 10; i ++) {
    text(`Repeat text times ${i}`);
  }
});
```

```ts [Async logic]
import { comp } from 'horizon-core/component'

// Warning!: await freeze rendering.
const WaitComponent = comp(async (_, {}) => {
  // wait 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000))
});
```
:::

---

For rendering html tags, `$` is used. Which is derived from `canvas`

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const ContainerComponent = comp((_, { $, text }) => {
  $('div', { class: ["container"], "aria-label": "Container" }, () => {
    text("Container content");
  });
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const ContainerComponent = comp((props, canvas) => {
  canvas.$('div', { class: ["container"], "aria-label": "Container" }, () => {
    canvas.text("Container content");
  });
});
```
:::

We get an analog of the code in html:

```html
<div class="container" aria-label="Container">
  <span>I'm display text!</span>
</div>
```

---

To add input data, we can use. `input` from `canvas`.

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const InputDataComponent = comp((_, { input }) => {
  input({ type: "text" });
  input({ type: "number" });
  input({ type: "email" });
  input({ type: "checkbox" });
  input({ type: "file" });
  input({ type: "color" });
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const InputDataComponent = comp((props, canvas) => {
  canvas.input({ type: "text" });
  canvas.input({ type: "number" });
  canvas.input({ type: "email" });
  canvas.input({ type: "checkbox" });
  canvas.input({ type: "file" });
  canvas.input({ type: "color" });
});
```
:::

We get an analog of the code in html:

```html
<input type="text">
<input type="number">
<input type="email">
<input type="checkbox">
<input type="file">
<input type="color">
```

---

To add image, we can use. `img` from `canvas`.

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const InputDataComponent = comp((_, { img }) => {
  img("./logo.svg");
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const InputDataComponent = comp((props, canvas) => {
  canvas.img("./logo.svg");
});
```
:::

We get an analog of the code in html:

```html
<img src="./logo.svg">
```

---

Dynamic types, removes much of the work of automating types. Allows to execute different dynamic rendering through one function
To add Dynamic types, we can use. `implement` from `canvas`.

::: warning Warning!
Use with caution, performance sags may occur if used unnecessarily
:::

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const OtherComponent = comp((_, { text }) => {
  text("Other Component")
});

const InputDataComponent = comp((_, { implement, text }) => {
  // Render as text
  implement("Text!");

  // Render as slot
  implement(() => {
    text("Render as slot!")
  });

  // Render as component
  implement(OtherComponent);
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const OtherComponent = comp((props, canvas) => {
  canvas.text("Other Component")
});

const InputDataComponent = comp((props, canvas) => {
  // Render as text
  canvas.implement("Text!");

  // Render as slot
  canvas.implement(() => {
    canvas.text("Render as slot!")
  });

  // Render as component
  canvas.implement(OtherComponent);
});
```
:::

We get an analog of the code in html:

```html
<span>Text!</span>
<span>Render as slot!</span>
<span>Other Component</span>
```

## Implementation in other Component

To use another component, we use the `use` method of `canvas`

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const HelloWorldComponent = comp((_, { text }) => {
  text("Hello world!");
});

// Root component
const MainComponent = comp((_, { use }) => {
  use(HelloWorldComponent);
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const HelloWorldComponent = comp((props, canvas) => {
  canvas.text("Hello world!");
});

// Root component
const MainComponent = comp((props, canvas) => {
  canvas.use(HelloWorldComponent);
});
```
:::

We get an analog of the code in html:

```html
<span>Hello world!</span>
```

## Props (Transferring data)

Components have props, for transferring data from other components. Props can contain any type of data.
Typing is also possible

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

interface ITitle {
  title: string;
}

const TitleComponent = comp<ITitle, {}>(({ title }, { $, text }) => {
  $('h1', {}, () => {
    text(title);
  });
});

// Root component
const MainComponent = comp((_, { use }) => {
  use(TitleComponent, { title: "Site title" });
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

interface ITitle {
  title: string;
}

const TitleComponent = comp<ITitle, {}>((props canvas) => {
  canvas.$('h1', {}, () => {
    canvas.text(props.title);
  });
});

// Root component
const MainComponent = comp((props, canvas) => {
  canvas.use(TitleComponent, { title: "Site title" });
});
```
:::

We get an analog of the code in html:

```html
<h1>
  <span>Hello world!</span>
</h1>
```

## Slots

Also, components can be an intermediary, and an end-to-end wrapper object

:::code-group
```ts [Form Component]
import { comp } from 'horizon-core/component'

type FormSlots  = {
  createField: (dataIndex: string, fieldType: InputType): void;
};

const FormComponent = comp<{}, FormSlots>((_, { $, input, slot }) => {
  const formRecord: Record<string, unknown> = {};
  
  function createField(dataIndex: string, fieldType: InputType) => {
    input({
      name: dataIndex,
      type: fieldType, 
      value: formRecord[dataIndex] ?? "",
      "@change"(ev) {
        formRecord[dataIndex] = ev.target.value;
      },
      ... 
    });
  }

  $('form', {}, () => {
    slot({ createField });
  });
});

export FormComponent;
```

```ts [Usage]
import { comp } from 'horizon-core/component'
import { FormComponent } from 'formComponent.ts'

// Root component
const MainComponent = comp((_, { $, use, text }) => {
  use(FormComponent, {}, ({ createField }) => {
    $('section', {}, () => {
      createField("lastName", "text");
      createField("firstName", "text");
    });
    
    $('section', {}, () => {
      createField("age", "number");
    });

    $('button', { type: 'submit' }, () => {
      text("Submit");
    })
  });
});
```
:::

We get an analog of the code in html:

```html
<form>
  <section>
    <input name="lastName" type="text" value="">
    <input name="firstName" type="text" value="">
  </section>
  <section>
    <input name="age" type="number" value="">
  </section>
  <button type="submit">
    Submit
  </button>
</form>
```

## Unmount component (Destructor)

It is possible to track when a component is unmounted (Destructing component)

:::code-group
```ts [Regular view]
import { comp } from 'horizon-core/component'

const TestComponent = comp((_, { onUnmount }) => {
  onUnmount(() => {
    console.log("Component is removed");
  });
});
```

```ts [Clearly view]
import { comp } from 'horizon-core/component'

const TestComponent = comp((props, canvas) => {
  canvas.onUnmount(() => {
    console.log("Component is removed");
  });
});
```
:::