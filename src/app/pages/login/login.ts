import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, minLength, required, FormField } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors';
import { Store } from '@ngrx/store';
import { authActions } from '../../shared/store/auth-actions';
import { authFeature } from '../../shared/store/auth-feature';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField, FormErrors],
  template: `
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-slate-800">Welcome back</h2>
          <p class="text-slate-500 mt-2">Please enter your details to sign in.</p>
        </div>

        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <input
              type="text"
              [formField]="loginForm.username"
              placeholder="Enter your username"
              class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <app-form-errors [control]="loginForm.username()"></app-form-errors>
          </div>

          <div class="mt-2">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-slate-700">Password</label>
            </div>
            <input
              type="password"
              [formField]="loginForm.password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <app-form-errors [control]="loginForm.password()"></app-form-errors>
          </div>

          <button
            (click)="login()"
            [disabled]="loginForm().invalid() || isLoading()"
            size="lg"
            appButton
            type="button"
            class="w-full"
          >
            {{ isLoading() ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>
      </div>

      <div class="bg-slate-50 border-t border-slate-200 p-6 text-center">
        <p class="text-sm text-slate-600">
          Don't have an account?
          <a
            routerLink="/register"
            class="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all"
            >Register here</a
          >
        </p>
      </div>
    </div>
  `,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4 w-full',
  },
})
export class Login {
  loginModel = signal({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (rootpath) => {
    required(rootpath.username, { message: 'Username is required' });
    required(rootpath.password, { message: 'Password is required' });
    minLength(rootpath.password, 6, { message: 'Password must be at least 6 characters long' });
  });

  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeature.selectIsLoading));

  login() {
    if (this.loginForm().valid()) {
      this.store.dispatch(authActions.login(this.loginForm().value()));
    } else {
      console.log('Invalid form');
    }
  }
}
