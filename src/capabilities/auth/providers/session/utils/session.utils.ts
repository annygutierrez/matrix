import React from 'react';

export type UserProfile = {
    userName: string;
    userId: string;
    avatarUrl: string;
    membersClubCode: string;
    membersClub: string;
}

export const userDefaultValues = {
    userName: 'Anny Gutierrez',
    userId: '12345',
    avatarUrl: 'https://avatars.githubusercontent.com/u/32302890?v=4',
    membersClubCode: 'GOLD',
    membersClub: 'Golden Club'
};

export interface SessionContextProps {
    userProfile: UserProfile;
    setUserProfile: React.Dispatch<
    React.SetStateAction<UserProfile>
  >;
}
