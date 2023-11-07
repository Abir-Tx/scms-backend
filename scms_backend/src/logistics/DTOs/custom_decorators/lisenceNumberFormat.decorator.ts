import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsLicenseNumberFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(licenseNumber: string, args: ValidationArguments) {
    // Define a regular expression to match the desired format
    const pattern = /^[A-Z]{3}-\d{3}-\d{2}-\d{1}$/;
    return pattern.test(licenseNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'License number must be in the format "XXX-XXX-XX-X"';
  }
}

export function IsLicenseNumberFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLicenseNumberFormatConstraint,
    });
  };
}
