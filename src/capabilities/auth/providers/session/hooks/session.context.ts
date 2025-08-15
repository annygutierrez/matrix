import { useContext } from 'react';
import { SessionContext } from '../session.provider';

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSessionContext must be used within an ApplicationProvider');
  }
  return context;
};
