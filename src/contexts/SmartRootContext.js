// @flow
import * as React from 'react';
import { SmartRootContextT } from '../types';

const { InnerSmartRootProvider, SmartRootConsumer } = React.createContext<SmartRootContextT>({
  contextMap: {},
});

export { InnerSmartRootProvider, SmartRootConsumer };