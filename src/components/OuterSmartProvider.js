// @flow
import * as React from 'react';
import { SmartRootConsumer } from '../contexts/SmartRootContext';
import { InnerSmartProvider } from '../contexts/SmartContext';
import { SmartContextT, SmartRootContextT } from '../types';

type OuterProps = {|
    children: React.Node,
    addContext: Function,
    Context: React.Context,
    value: any,
    tag: string,
    actions: Array<Function>,
|};

class OuterSmartProvider extends React.Component<OuterProps, {}> {
    componentDidMount() {
        const { tag, addContext } = this.props;

        if (tag) {
            const Context = React.createContext(null);
            addContext(Context, tag);
        } else {
            throw new Error("You must pass a 'tag' prop to the SmartProvider");
        }
    }

    render() {
        const { Context, value, actions, children } = this.props;

        if (Context) {
            return (
                <Context.Provider value={value, actions}>
                    {React.children.only(children)}
                </Context.Provider>
            );
        }
    }
}

type InnerProps = {|
    tag: string,
    value: any,
    actions: Array<Function>,
|};

const ProviderWithContext = ({ tag, value, actions }: InnerProps) => (
    <SmartRootConsumer>
        {({ addContext, contextMap }: SmartRootContextT) => (
            <OuterSmartProvider
                tag={tag}
                value={value}
                actions={actions}
                addContext={addContext}
                Context={contextMap[tag]}
            />
        )}
    </SmartRootConsumer>
);

export default ProviderWithContext;