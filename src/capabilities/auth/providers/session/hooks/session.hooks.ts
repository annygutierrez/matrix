import { useState, useMemo } from 'react';
import { userDefaultValues, UserProfile } from '../utils/session.utils';
  
  export const useSessionContextState = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>(userDefaultValues);
  
    const contextState = useMemo(
      () => ({
        userProfile,
        setUserProfile
      }),
      [
        userProfile,
        setUserProfile
      ]
    );
  
    return contextState;
  };
  