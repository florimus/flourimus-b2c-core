import Logger from '../../core/logger';
import runtimeConfig from '@config';

describe('Logger', () => {
  let originalLogLevel: string | undefined;

  beforeAll(() => {
    originalLogLevel = runtimeConfig.LOG_LEVEL;
  });

  afterEach(() => {
    jest.clearAllMocks();
    runtimeConfig.LOG_LEVEL = originalLogLevel;
  });

  it('should log trace messages when log level is TRACE', () => {
    runtimeConfig.LOG_LEVEL = 'trace';
    const consoleSpy = jest.spyOn(console, 'trace').mockImplementation();

    Logger.trace('Trace message');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[TRACE]'));
  });

  it('should log debug messages when log level is DEBUG', () => {
    runtimeConfig.LOG_LEVEL = 'debug';
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation();

    Logger.debug('Debug message');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[DEBUG]'));
  });

  it('should log info messages when log level is INFO', () => {
    runtimeConfig.LOG_LEVEL = 'info';
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

    Logger.info('Info message');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO]'));
  });

  it('should log info messages when log level is INFO if not configured', () => {
    runtimeConfig.LOG_LEVEL = '';
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

    Logger.info('Info message');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO]'));
  });

  it('should log error messages regardless of log level', () => {
    runtimeConfig.LOG_LEVEL = 'error';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    Logger.error('Error message');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });

  it('should not log debug messages when log level is INFO', () => {
    runtimeConfig.LOG_LEVEL = 'info';
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation();

    Logger.debug('Debug message');

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should format messages with placeholders', () => {
    runtimeConfig.LOG_LEVEL = 'info';
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

    Logger.info('Info message with {} and {}', 'placeholder1', 'placeholder2');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Info message with placeholder1 and placeholder2')
    );
  });
  
  it('should format messages with placeholders', () => {
    const formattedMessage = Logger['formatMessage'](
      'Message with {} and {}',
      'arg1',
      'arg2'
    );
    expect(formattedMessage).toBe('Message with arg1 and arg2');
  });

  it('should leave unmatched placeholders as {}', () => {
    const formattedMessage = Logger['formatMessage'](
      'Message with {} and {}',
      'arg1'
    );
    expect(formattedMessage).toBe('Message with arg1 and {}');
  });

  it('should handle no placeholders', () => {
    const formattedMessage = Logger['formatMessage'](
      'Message with no placeholders'
    );
    expect(formattedMessage).toBe('Message with no placeholders');
  });

  it('should handle extra arguments', () => {
    const formattedMessage = Logger['formatMessage'](
      'Message with {}',
      'arg1',
      'arg2'
    );
    expect(formattedMessage).toBe('Message with arg1');
  });
});
