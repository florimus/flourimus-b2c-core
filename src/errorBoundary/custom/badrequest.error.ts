import statusCodes from '@core/statusCodes';

/**
 * Represents a BadRequest error with HTTP status code 400.
 * This error is typically used to indicate that the server cannot process the request due to a client error.
 *
 * @extends {Error}
 */
class BadRequest extends Error {
  public status: number = statusCodes.BAD_REQUEST;
  constructor(
  message: string,
  ) {
  super(message);
  this.name = 'BadRequest';
  }
}

export default BadRequest;
