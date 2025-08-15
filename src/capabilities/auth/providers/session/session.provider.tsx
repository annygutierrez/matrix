import React, {
    createContext,
    ReactNode
  } from 'react';
  import { useSessionContextState } from './hooks/session.hooks';
import { SessionContextProps } from './utils/session.utils';
  
  export const SessionContext = createContext<
  SessionContextProps | undefined
  >(undefined);
  
  export const SessionProvider = ({
    children
  }: {
    children: ReactNode;
  }) => {
    const contextState = useSessionContextState();
  
    return (
      <SessionContext.Provider value={contextState}>
        {children}
      </SessionContext.Provider>
    );
  };
  