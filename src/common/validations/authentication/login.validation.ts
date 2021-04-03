import * as Joi from 'joi';

export /** @type {*} */
const LoginUserValidation = Joi.object()
  .keys({
    phoneNumber: Joi.string()
      .required()
      .messages({
        'number.base': `Phone number format is incorrect.`,
        'any.required': `Phone number is required.`,
      })
      .label('Phone number')
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
  })
  .required()
  .messages({
    'object.unknown': 'This field is not allowed.',
  });
