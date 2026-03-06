import { minLength, required, schema, validate } from '@angular/forms/signals';

export type RegisterModel = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema = schema<RegisterModel>((rootpath) => {
  required(rootpath.username, { message: 'Username is required' });
  required(rootpath.email, { message: 'Email is required' });
  required(rootpath.password, { message: 'Password is required' });
  required(rootpath.confirmPassword, { message: 'Confirm Password is required' });
  minLength(rootpath.password, 6, { message: 'Password must be at least 6 characters long' });
  minLength(rootpath.confirmPassword, 6, {
    message: 'Confirm Password must be at least 6 characters long',
  });
  validate(rootpath.confirmPassword, ({ value, valueOf }) => {
    const password = valueOf(rootpath.password);
    const confirmPassword = value();
    if (!password) {
      return null;
    }

    if (password !== confirmPassword) {
      return {
        kind: 'confirmPasswordMismatch',
        message: 'Passwords do not match',
      };
    }
    return null;
  });
});
