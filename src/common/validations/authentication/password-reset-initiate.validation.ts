import * as Joi from 'joi';

export /** @type {*} */
const PasswordResetInitiateValidation = Joi.object()
  .keys({
    phoneNumber: Joi.string()
      .required()
      .messages({
        'number.base': `Phone number format is incorrect.`,
        'any.required': `Phone number is required.`,
      })
      .label('Phone number')
      .required(),
  })
  .required()
  .messages({
    'object.unknown': 'This field is not allowed.',
  });
