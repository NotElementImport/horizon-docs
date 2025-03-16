# Reactivity / Computed

`Computed` is a formula (function) that recalculates the value, from changes in the incoming properties. For example `a + b = c` where `c` is the `Computed` output value.

Creating `Computed` property:

```ts
import { useComputed, useSignal } from 'horizon-core/state'

const a = useSignal(2);
const b = useSignal(3);

const c = useComputed((val) => val(a) + val(b));
// signal.value: c = 5
```

`useComputed` work like that:

```ts
import { useSignal, unSignal, watch } from 'horizon-core/state'

function useComputed(handle: Function) {
  return useSignal(null, {
    onInit(signal) {
      // ...core.startFindSignals
      signal.value = handle(unSignal);
      // ...core.endFindSignals
      for(const signal of signals) {
        watch(signal, () => signal.value = handle(unSignal));
      }
    }
  });
};
```

## Lazy computed (Controllable computed)

Lazy Computed is a copy of Computed only with the ability to specify Signals yourself, which will speed up the processing of complex calculations

```ts
import { useLazyComputed, useSignal } from 'horizon-core/state'

const a = useSignal(2);
const b = useSignal(3);

const c = useComputed((val) => val(a) + val(b)); // [!code --]
const c = useLazyComputed([a, b], (val) => val(a) + val(b)); // [!code ++]
```