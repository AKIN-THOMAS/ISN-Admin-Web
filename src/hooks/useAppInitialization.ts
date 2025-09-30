import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';

export const useAppInitialization = () => {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    // If we have a token but user is not authenticated, try to get current user
    if (token && !isAuthenticated) {
      // dispatch(getCurrentUserAsync());
    }
  }, [dispatch, token, isAuthenticated]);
};