import {renderHook, act} from '@testing-library/react-native';

jest.mock('../../utils/session.utils', () => ({
  userDefaultValues: { id: 'u1', name: 'John Doe', email: 'john@example.com' },
}));

import {useSessionContextState} from '../session.hooks';

describe('useSessionContextState', () => {
  it('returns the default user profile on init', () => {
    const {result} = renderHook(() => useSessionContextState());
    expect(result.current.userProfile).toEqual({
      id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(typeof result.current.setUserProfile).toBe('function');
  });

  it('updates userProfile when setUserProfile is called', () => {
    const {result} = renderHook(() => useSessionContextState());

    act(() => {
      result.current.setUserProfile({
        id: 'u2',
        name: 'Jane',
        email: 'jane@example.com',
      } as any);
    });

    expect(result.current.userProfile).toEqual({
      id: 'u2',
      name: 'Jane',
      email: 'jane@example.com',
    });
  });

  it('memoizes the returned context object (stable when state is unchanged)', () => {
    const {result} = renderHook(() => useSessionContextState());
    const firstRef = result.current;
    const setterRef = result.current.setUserProfile;

    act(() => {
      result.current.setUserProfile(result.current.userProfile);
    });

    expect(result.current).toBe(firstRef);
    expect(result.current.setUserProfile).toBe(setterRef);
  });

  it('changes the memoized object when userProfile changes', () => {
    const {result} = renderHook(() => useSessionContextState());
    const firstRef = result.current;

    act(() => {
      result.current.setUserProfile({
        ...result.current.userProfile,
        userName: 'Changed',
      } as any);
    });

    expect(result.current).not.toBe(firstRef);
    expect(result.current.userProfile.userName).toBe('Changed');
  });
});
