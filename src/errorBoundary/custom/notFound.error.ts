import statusCodes from '@core/statusCodes';

/**
 * Represents a NotFound error with HTTP status code 404.
 * This error is typically used to indicate that the requested resource could not be found.
 *
 * @extends {Error}
 */
class NotFound extends Error {
  public status: number = statusCodes.NOT_FOUND;
  constructor(
  message: string,
  ) {
  super(message);
  this.name = 'Not_found';
  }
}

export default NotFound;
