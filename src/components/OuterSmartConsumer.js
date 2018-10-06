// @flow
import * as React from 'react';
import { InnerSmartConsumer } from '../contexts/SmartContext';
import { SmartRootContextT, ContextMapT } from '../types';

type OuterProps = {|
    children: React.Node,
    contextMap: ContextMapT,
    tag: string,
|};

const OuterSmartConsumer = ({ tag, contextMap, children }: OuterProps) => {
    const Context = contextMap[tag];

    return (
        <Context.Consumer>
            {React.children.only(children)}
        </Context.Consumer>
    );
};

type InnerProps = {|
    tag: string,
|};

const ProviderWithContext = (props: InnerProps) => (
    <SmartRootConsumer>
        {({ contextMap }: SmartRootContextT) => <OuterSmartConsumer {...props} getContext={getContext} />}
    </SmartRootConsumer>
);

export default ProviderWithContext;