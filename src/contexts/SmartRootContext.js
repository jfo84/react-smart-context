// @flow
import * as React from 'react';
import type { SmartRootContextT } from '../types';

const { Provider, Consumer } = React.createContext<SmartRootContextT>({
    contextsMap: {},
    addContexts() {},
});

export { Provider as InnerSmartRootProvider, Consumer as SmartRootConsumer };
