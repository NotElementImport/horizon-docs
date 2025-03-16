# Reactivity / Overview

Reactive programming is a programming paradigm that focuses on data flows and change propagation. This means that it should be possible to easily express static and dynamic data flows, and that the underlying execution model should automatically propagate changes due to the data flow.

For example, in imperative programming, assigning `a = b + c` would mean that variable a would be assigned the result of the `b + c` operation using the current (at the time of computation) values of the variables. Later, the values of variables `b` and `c` can be changed without any effect on the value of variable `a`.

In reactive programming, on the other hand, the value of a will be automatically recalculated based on the new values.