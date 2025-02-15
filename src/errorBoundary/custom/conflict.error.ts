/**
 * Represents a conflict error with HTTP status code 409.
 * This error is typically used to indicate that a request could not be processed
 * because of a conflict in the request, such as an edit conflict between multiple simultaneous updates.
 *
 * @extends {Error}
 */
class Conflict extends Error {
    public status: number = 409;
  constructor(
    message: string,
  ) {
    super(message);
    this.name = 'Conflict';
  }
}

export default Conflict;
