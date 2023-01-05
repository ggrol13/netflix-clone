import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: { message: 'Field password is week', ...validationOptions },
      validator: {
        //Todo: write logic validate password
        validate(value: any) {
          return typeof value === 'string';
        },
      },
    });
  };
}
