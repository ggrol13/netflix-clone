import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { message: 'Field password is week', ...validationOptions },
      validator: {
        validate(value: any) {
          const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          try {
            if (!regex.test(value)) {
              return false;
            }
          } catch (e) {
            return false;
          }
          return typeof value === 'string';
        },
      },
    });
  };
}
