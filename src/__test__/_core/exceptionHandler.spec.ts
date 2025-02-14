import { Response } from 'express';
import handleException from '../../core/exceptionHandler';

describe('handleException', () => {
  let mockResponse: Response;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should respond with the error status and message', () => {
    const error = new Error('Test error') as Error & { status?: number };
    error.status = 400;

    handleException(error, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: 'Test error',
        statusCode: 400,
        stack: error.stack,
      },
    });
  });

  it('should respond with status 500 if no status is provided', () => {
    const error = new Error('Test error') as Error & { status?: number };

    handleException(error, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: 'Test error',
        statusCode: 500,
        stack: error.stack,
      },
    });
  });

  it('should respond with "Internal Server Error" if no message is provided', () => {
    const error = new Error() as Error & { status?: number };
    error.status = 400;

    handleException(error, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: 'Internal Server Error',
        statusCode: 400,
        stack: error.stack,
      },
    });
  });

  it('should not include stack trace in production environment', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Test error') as Error & { status?: number };
    error.status = 400;

    handleException(error, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: 'Test error',
        statusCode: 400,
      },
    });

    process.env.NODE_ENV = 'test';
  });
});
