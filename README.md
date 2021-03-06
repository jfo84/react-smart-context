# React Smart Context

## DEPRECATED - This project is deprecated. It's still interesting as a proof of concept, but the Hooks Proposal makes it functionally obsolete

In search of better React state management solutions, I found a hole where the state was long-lived and the actions to manipulate it were simple. Redux has significant boilerplate in these use cases, and React 16 Context can have rough edges when populating the default value with Component state.

So I wrote a simple library called React Smart Context. It uses a Context-in-Context paradigm: a root Context manages a map of Contexts, each with a single (smart) Provider.

The SmartProvider and SmartConsumer consume the root Context and maintain the same API as Provider and Consumer.

All you need to do is:
1. Wrap your App with the SmartRootProvider Component
2. Pass a 'tag' prop to internally tag the particular Context (similar to the keyed state shape of Redux)
3. Pass an 'actions' prop, a map of functions that manipulate state, to your Provider alongside your 'value' prop 

Here's an example of a stateful Provider Component:

```js
import * as React from 'react';
import { SmartProvider } from 'react-smart-context';

class AnalyticsProvider extends React.Component {
    state = {
        blueprintName: 'Blueprint',
    };

    actions = {
        selectBlueprintName: (name) => this.setState(prevState => ({ blueprintName: name })),
    };

    render() {
        const { children } = this.props;

        return (
            <SmartProvider tag='analytics' state={{ ...this.state }} actions={this.actions}>
                {React.Children.only(children)}
            </SmartProvider>
        );
    }
}
```

and it's matching Consumer, which allows consumption of state and actions based on a boolean prop:

```js
import * as React from 'react';
import { SmartConsumer } from 'react-smart-context';

const BlueprintSelector = ({ name }) => (
    <SmartConsumer actions tag='analytics'>
        {({ selectBlueprintName }) => (
            <button onClick={() => selectBlueprintName(name)}>
                Select Blueprint
            </button>
        )}
    </SmartConsumer>
);
```

That's it. All direct usage of Context is abstracted away. The state and the logic for manipulating it now live under one roof: your stateful Provider.

The library's only dependency is React, and the implementation including static types clocks in at under 200 lines of JavaScript.

Requires React 16.3+