// @flow
import * as React from 'react';

export type ContextMapT = {|
    [tag: string]: React.Context
|};

export type SmartRootContextT = {|
    contextMap: ContextMapT,
|};