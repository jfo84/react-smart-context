// @flow
import * as React from 'react';
import { SmartRootConsumer } from '../contexts/SmartRootContext';
import type { SmartRootContextT } from '../types';

type OuterProps = {|
    Consumer: React.Consumer,
    children: Function,
|};

const OuterSmartConsumer = ({ Consumer, children }: OuterProps) => <Consumer>{children}</Consumer>;

type InnerProps = {|
    tag: string,
    state: boolean,
    actions: boolean,
    children: Function,
|};

const ProviderWithContext = ({ tag, state, actions, children }: InnerProps) => {
    if (!state && !actions) {
        throw new Error("You must pass a 'state' or 'actions' prop to indicate the type of Consumer")
    }

    return (
        <SmartRootConsumer>
            {({ contextsMap }: SmartRootContextT) => {
                const { Consumers } = contextsMap[tag];

                if (!Consumers) {
                    throw new Error("You must pass a 'tag' prop that matches that of a descendant SmartProvider");
                }

                if (state) {
                    return <OuterSmartConsumer Consumer={Consumers.State}>{children}</OuterSmartConsumer>;
                }

                if (actions) {
                    return <OuterSmartConsumer Consumer={Consumers.Actions}>{children}</OuterSmartConsumer>;
                }
            }}
        </SmartRootConsumer>
    );
}

export default ProviderWithContext;
