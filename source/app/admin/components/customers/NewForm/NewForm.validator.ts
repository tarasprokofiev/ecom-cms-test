import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const emailRule = z
  .string()
  .trim()
  .min(1, {message: 'Email is required'})
  .email('Must be a valid email');

export const firstNameRule = z.string().trim().min(1, {message: 'First Name is required'});
export const lastNameRule = z.string().trim().min(1, {message: 'Last Name is required'});
export const passwordRule = z.string().trim().min(8, {message: 'Password must be greater than 8'});
export const passwordConfirmRule = z.string();
export const phone = z.string();

export const newFormValidator = withZod(
  z.object({
    email: emailRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
    password: passwordRule,
    passwordConfirm: passwordConfirmRule,
    phone: phone,
  })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'Passwords don\'t match',
      path: ['passwordConfirm'], // path of error
    })
);