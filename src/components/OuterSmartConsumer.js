// @flow
import * as React from 'react';
import { SmartRootConsumer } from '../contexts/SmartRootContext';
import { SmartRootContextT, ContextMapT } from '../types';

type OuterProps = {|
    Context: React.Context,
    children: React.Node,
|};

const OuterSmartConsumer = ({ Context, children }: OuterProps) => {
    if (Context) {
        return (
            <Context.Consumer>
                {React.children.only(children)}
            </Context.Consumer>
        );
    }
    
    throw new Error("Your 'tag' prop must match that of an ancestor SmartProvider");
};

type InnerProps = {|
    tag: string,
|};

const ProviderWithContext = ({ tag }: InnerProps) => (
    <SmartRootConsumer>
        {({ contextMap }: SmartRootContextT) => <OuterSmartConsumer Context={contextMap[tag]} />}
    </SmartRootConsumer>
);

export default ProviderWithContext;