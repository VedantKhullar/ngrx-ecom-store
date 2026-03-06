import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, required, validate, FormField, minLength } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors';
import { registerSchema } from './register-schema';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, FormField, FormErrors],
  template: `
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-slate-800">Create an Account</h2>
          <p class="text-slate-500 mt-2">Sign up to get started.</p>
        </div>

        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <input
              [formField]="registerForm.username"
              type="text"
              placeholder="Choose a username"
              class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <app-form-errors [control]="registerForm.username()" />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              [formField]="registerForm.email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <app-form-errors [control]="registerForm.email()" />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              [formField]="registerForm.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <app-form-errors [control]="registerForm.password()" />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
            <input
              [formField]="registerForm.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <app-form-errors [control]="registerForm.confirmPassword()" />
          </div>

          <button
            size="lg"
            appButton
            type="button"
            class="w-full !mt-6"
            (click)="register()"
            [disabled]="registerForm().invalid()"
          >
            Register
          </button>
        </form>
      </div>

      <div class="bg-slate-50 border-t border-slate-200 p-6 text-center">
        <p class="text-sm text-slate-600">
          Already have an account?
          <a
            routerLink="/login"
            class="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all"
            >Sign in here</a
          >
        </p>
      </div>
    </div>
  `,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4 w-full',
  },
})
export class Register {
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, registerSchema);

  register() {
    if (this.registerForm().valid()) {
      console.log(this.registerForm().value());
    } else {
      console.log('Invalid form');
    }
  }
}
