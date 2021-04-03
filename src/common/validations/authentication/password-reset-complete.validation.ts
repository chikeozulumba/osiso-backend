import * as Joi from 'joi';

export /** @type {*} */
const PasswordResetCompleteValidation = Joi.object()
  .keys({
    phoneNumber: Joi.string()
      .required()
      .messages({
        'any.required': `Phone number is required.`,
      })
      .label('Phone number')
      .required(),

    code: Joi.number()
      .min(6)
      .required()
      .messages({
        'number.base': `Authorization code format is incorrect.`,
        'any.required': `Authorization code is required.`,
      })
      .label('Authorization code')
      .required(),

    password: Joi.string()
      .min(6)
      .messages({
        'string.empty': `Password field cannot be empty!`,
        'string.min':
          'Your password length must be at least 6 characters long.',
        'string.pattern.base': `Password should contain at least a character(lowercase and uppercase), number and special character.`,
        'any.required': `Password is required.`,
      })
      .label('Password')
      .required(),

    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .label('Confirm Password')
      .required()
      .messages({
        'any.only': 'Password does not match',
      }),
  })
  .required()
  .messages({
    'object.unknown': 'This field is not allowed.',
  });
