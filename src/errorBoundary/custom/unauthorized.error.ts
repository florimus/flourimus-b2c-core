import statusCodes from '@core/statusCodes';

/**
 * Represents an UnAuthorized error with HTTP status code 401.
 * This error is typically used to indicate that the request requires user authentication.
 *
 * @extends {Error}
 */
class UnAuthorized extends Error {
  public status: number = statusCodes.UNAUTHORIZED;
  constructor(
  message: string,
  ) {
  super(message);
  this.name = 'UnAuthorized';
  }
}

export default UnAuthorized;
