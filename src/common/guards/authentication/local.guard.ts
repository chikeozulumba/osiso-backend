import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  /**
   *
   *
   * @param {ExecutionContext} context
   * @return {*} this
   * @memberof LocalAuthGuard
   */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   * @description Handle the request based on the authorization login.
   *
   * @param {*} err
   * @param {*} user
   * @return {*} user
   * @memberof LocalAuthGuard
   */
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
