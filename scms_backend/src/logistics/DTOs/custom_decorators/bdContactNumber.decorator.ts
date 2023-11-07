import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsBangladeshPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(contactNumber: string) {
    // Define a regular expression pattern for a Bangladesh mobile phone number
    const pattern = /^^\+880\d{10}$/;
    return pattern.test(contactNumber);
  }

  defaultMessage() {
    return 'Invalid Bangladesh mobile phone number format';
  }
}

export function IsBangladeshPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBangladeshPhoneNumberConstraint,
    });
  };
}
