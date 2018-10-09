// @flow
import * as React from 'react';

export type ContextsT = {|
    Providers: ProvidersT,
    Consumers: ConsumersT,
|};

export type ProvidersT = {|
    Actions: React.Provider,
    State: React.Provider,
|};

export type ConsumersT = {|
    Actions: React.Consumer,
    State: React.Consumer,
|};

export type ContextsMapT = {|
    [tag: string]: ContextsT,
|};

export type SmartRootContextT = {|
    contextsMap: ContextsMapT,
    addContext: Function,
|};
