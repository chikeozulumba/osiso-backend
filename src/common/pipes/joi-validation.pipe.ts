import {
  PipeTransform,
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { IObject } from './../../../definition.d';

/**
 * @description Class for validating request parameters, body and queries.
 *
 * @export
 * @class JoiValidationPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  /**
   * @description Method for transforming the recieved value and validating.
   *
   * @param {IObject} value
   * @return {*}  {(IObject | UnprocessableEntityException)}
   * @memberof JoiValidationPipe
   */
  transform(value: IObject): IObject | UnprocessableEntityException {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      if (process.env.APP_ENV === 'development') {
        console.log(error);
      }
      const { details } = error;
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fields: Array.isArray(details)
          ? this.convertErrorsToKeyValues(details)
          : details,
        type: 'validation',
      });
    }
    return value;
  }

  /**
   * @description Method for converting abstract data types to strictly key-value data types.
   *
   * @private
   * @param {Array<IObject>} details
   * @return {*}  {IObject}
   * @memberof JoiValidationPipe
   */
  private convertErrorsToKeyValues(details: Array<IObject>): IObject {
    const formatted = {};
    details.forEach((detail: IObject) => {
      formatted[detail.path[0]] = detail.message;
    });
    return formatted;
  }
}
