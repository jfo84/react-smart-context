// @flow
import * as React from 'react';
import { SmartRootConsumer } from '../contexts/SmartRootContext';
import { InnerSmartProvider } from '../contexts/SmartContext';
import { SmartContextT, SmartRootContextT } from '../types';

type OuterProps = {|
    children: React.Node,
    addContext: Function,
    value: any,
    tag: string,
|};

class OuterSmartProvider extends React.Component<OuterProps, {}> {
    componentDidMount() {
        const { tag, addContext } = this.props;
        const Context = React.createContext(null);
        addContext(Context, tag);
    }

    render() {
        const { tag, contextMap, children } = this.props;

        const Context = contextMap[tag];

        return (
            <Context.Consumer>
                {React.children.only(children)}
            </Context.Consumer>
        );
    }
}

type InnerProps = {|
    value: null,
    tag: string,
|};

const ProviderWithContext = (props: InnerProps) => (
    <SmartRootConsumer>
        {({ addContext, contextMap }: SmartRootContextT) => (
            <OuterSmartProvider
                {...props}
                addContext={addContext}
                contextMap={contextMap}
            />
        )}
    </SmartRootConsumer>
);

export default ProviderWithContext;