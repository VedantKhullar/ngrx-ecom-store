import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth-actions';

export type AuthState = {
  token: string | null;
  userId: string | null;
  error: string | null;
  isLoading: boolean;
};

export const initialAuthState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(authActions.loginSuccess, (state, { token }) => ({
      ...state,
      token,
      isLoading: false,
    })),

    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      token: null,
      error,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
    })),

    on(authActions.registerSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(authActions.registerFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(authActions.register, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
  ),
});
