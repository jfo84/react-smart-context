// @flow
import * as React from 'react';
import { InnerSmartRootProvider } from '../contexts/SmartRootContext';
import type { SmartRootContextT } from '../types';

type Props = {|
    children: React.Node,
|};

class OuterSmartRootProvider extends React.Component<Props, SmartRootContextT> {
    state = {
        contextsMap: {},
        addContexts: (tag: string) => this.addContexts(tag),
    };

    addContexts = (tag: string) => {
        const Contexts = {
            Providers: {},
            Consumers: {},
            push: function(type: string) {
                const { Provider, Consumer } = React.createContext(null);
                this.Providers[type] = Provider;
                this.Consumers[type] = Consumer;
            },
        };

        Contexts.push('State');
        Contexts.push('Actions');

        this.setState((prevState) => ({
            contextsMap: {
                ...prevState.contextsMap,
                [tag]: Contexts,
            },
        }));
    };

    render() {
        const { children } = this.props;

        return (
            <InnerSmartRootProvider value={{ ...this.state }}>
                {React.Children.only(children)}
            </InnerSmartRootProvider>
        );
    }
}

export default OuterSmartRootProvider;
