React Smart Context

In search of better React state management solutions, I found a hole where the state was long-lived and the actions to manipulate it were simple. Redux has significant boilerplate in these use cases, and Context can have rough edges when populating the default value with Component state.

So I wrote a simple library called React Smart Context. It has no dependencies, and the implementation including static types clocks in at under 200 lines of JavaScript. It uses a Context-in-Context paradigm: a root Context manages a map of Contexts, each with a single (smart) Provider.

The SmartProvider and SmartConsumer consume the root Context and maintain the same API as Provider and Consumer. All you need to do is:
1. Wrap your App with the SmartRootProvider Component
2. Add a string to tag the particular Context

Here's an example of a stateful Provider Component:

```js
import * as React from 'react';
import { SmartProvider } from 'react-smart-context';

class AnalyticsProvider extends React.Component {
    state = {
        blueprintId: '',
        selectBlueprintId: (id) => this.setState({ blueprintId: id }),
    };

    render() {
        const { children } = this.props;

        return (
            <SmartProvider tag='analytics' value={{ ...this.state }}>
                {React.Children.only(children)}
            </SmartProvider>
        );
    }
}
```

and it's matching Consumer:

```js
import * as React from 'react';
import { SmartConsumer } from 'react-smart-context';

const ISetState = ({ id }) => (
    <SmartConsumer tag='analytics'>
        {({ selectBlueprintId }) => (
            <button onClick={() => selectBlueprintId(id)}>
                Select Blueprint
            </button>
        )}
    </SmartConsumer>
);
```

The state is yours. Do whatever you want with it. 