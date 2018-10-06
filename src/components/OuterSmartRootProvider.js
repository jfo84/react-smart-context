// @flow
import * as React from 'react';
import { InnerSmartRootProvider } from '../contexts/SmartContext';
import { SmartRootContextT } from '../types';

type Props = {|
    children: React.Node,
|};

class OuterSmartRootProvider extends React.Component<Props, SmartContextT> {
    state = {
        contextMap: {},
        addContext: (Context: React.Context, tag: string) => this.addContext(Context, tag),
    };

    addContext = (Context: React.Context, tag: string) => {
        this.setState(prevState => ({
            contextMap: {
                ...prevState.contextMap,
                [tag]: Context,
            }
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

export default SmartRootProvider;