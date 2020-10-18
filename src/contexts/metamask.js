import React from 'react';

const MetamaskContext = React.createContext();

export default MetamaskContext;
export const MetamaskConsumer = MetamaskContext.Consumer;
export const MetamaskProvider = MetamaskContext.Provider;
