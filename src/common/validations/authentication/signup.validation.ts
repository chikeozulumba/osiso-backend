import * as Joi from 'joi';

export /** @type {*} */
const SignUpUserValidation = Joi.object()
  .keys({
    firstName: Joi.string()
      .required()
      .messages({
        'string.empty': `First name cannot be empty!`,
        'any.required': `First name is required.`,
      })
      .label('First name'),
    lastName: Joi.string()
      .required()
      .messages({
        'string.empty': `Last name cannot be empty!`,
        'any.required': `Last name is required.`,
      })
      .label('Last name'),
    scope: Joi.string()
      .valid('rider', 'customer')
      .required()
      .messages({
        'string.empty': `Account scope cannot be empty!`,
        'any.required': `Account scope is required.`,
        'any.only': `Account scope is invalid - only riders and customers are allowed.`,
      })
      .label('Account scope'),
    email: Joi.string()
      .email()
      .messages({
        'string.empty': `Email field cannot be empty!`,
        'string.email': `Your email is incorrect.`,
        'any.required': `Your email address is required.`,
      })
      .label('Email address')
      .when('scope', {
        is: 'customer',
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    phoneNumber: Joi.string()
      .required()
      .messages({
        'number.base': `Phone number format is incorrect.`,
        'any.required': `Phone number is required.`,
      })
      .label('Phone number'),
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
    countryId: Joi.string()
      .uuid()
      .messages({
        'string.guid': `Country selection is invalid!`,
        'any.required': `Country is required.`,
      })
      .label('Country')
      .required(),
  })
  .required()
  .messages({
    'object.unknown': 'This field is not allowed.',
  });
