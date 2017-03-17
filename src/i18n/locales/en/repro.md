A bug reproduction is a piece of code that can run and demonstrate how a bug can happen.

##### A repro is required

It's impossible to fix a bug from mere text descriptions - the real cause may very well be something that you forgot to even mention. A reproduction is the only way that can reliably help us understand what is going on, so please provide one.

##### A repro must be runnable

Screenshots or videos are **NOT** reproductions! They only show that the bug exists, but do not provide enough information on why it happens. Only runnable code provides the most complete context and allows us to properly debug the scenario. That said, in some cases videos/gifs can help explain interaction issues that are hard to describe in text.

##### A repro should be minimal

Some users would give us a link to a real project and hope we can help them figure out what is wrong. We generally do not accept such requests because:

- It is extremely time-consuming to hunt a bug in a big and unfamiliar codebase.

- The problematic behavior may very well be caused by your code rather than by a bug in Vue.

A **minimal** reproduction means it demonstrates the bug, and the bug only. It should only contain the bare minimum amount of code that can reliably cause the bug. Try your best to get rid of anything that aren't directly related to the problem.

##### How to create a repro

You can use online coding environments like [JSFiddle](https://jsfiddle.net/chrisvfritz/50wL7mdz/), [JSBin](https://jsbin.com) or [Codepen](https://codepen.io) to create reproductions. If your bug involves a build setup, you can create a project using [vue-cli](https://github.com/vuejs/vue-cli) and provide the link to a GitHub repository.
