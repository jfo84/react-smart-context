# React Smart Context

In search of better React state management solutions, I found a hole where the state was long-lived and the actions to manipulate it were simple. Redux has significant boilerplate in these use cases, and Context can have rough edges when populating the default value with Component state.

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
            <SmartProvider tag='analytics' value={{ ...this.state }} actions={{ ...this.actions }}>
                {React.Children.only(children)}
            </SmartProvider>
        );
    }
}
```

and it's matching Consumer, which allows consumption of state and actions as positional arguments:

```js
import * as React from 'react';
import { SmartConsumer } from 'react-smart-context';

const BlueprintSelector = ({ name }) => (
    <SmartConsumer tag='analytics'>
        {({ blueprintName }, { selectBlueprintName }) => (
            <React.Fragment>
                <h1>{blueprintName}</h1>
                <button onClick={() => selectBlueprintName(name)}>
                    Select Blueprint
                </button>
            </React.Fragment>
        )}
    </SmartConsumer>
);
```

That's it. All direct usage of Context is abstracted away, and the logic for manipulating state stays in one place: your stateful Provider. The library's only dependency is React, and the implementation including static types clocks in at under 200 lines of JavaScript.