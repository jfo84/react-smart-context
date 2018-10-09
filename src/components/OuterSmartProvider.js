// @flow
import * as React from 'react';
import { SmartRootConsumer } from '../contexts/SmartRootContext';
import type { ProvidersT, SmartRootContextT } from '../types';

type OuterProps = {|
    addContexts: Function,
    Providers: ProvidersT,
    tag: string,
    state: Object,
    actions: Object,
    children: React.Node,
|};

class OuterSmartProvider extends React.Component<OuterProps, {}> {
    componentDidMount() {
        const { tag, addContexts } = this.props;

        if (tag) {
            addContexts(tag);
        } else {
            throw new Error("You must pass a 'tag' prop to the SmartProvider");
        }
    }

    render() {
        const { Providers, state, actions, children } = this.props;

        if (Providers) {
            return (
                <Providers.State value={state}>
                    <Providers.Actions value={actions}>
                        {React.Children.only(children)}
                    </Providers.Actions>
                </Providers.State>
            );
        }

        return null;
    }
}

type InnerProps = {|
    tag: string,
    state: Object,
    actions: Object,
    children: React.Node,
|};

const ProviderWithContext = ({ tag, state, actions, children }: InnerProps) => (
    <SmartRootConsumer>
        {({ addContexts, contextsMap }: SmartRootContextT) => (
            <OuterSmartProvider
                tag={tag}
                state={state}
                actions={actions}
                addContexts={addContexts}
                Providers={contextsMap[tag] && contextsMap[tag].Providers}
            >
                {React.Children.only(children)}
            </OuterSmartProvider>
        )}
    </SmartRootConsumer>
);

export default ProviderWithContext;
