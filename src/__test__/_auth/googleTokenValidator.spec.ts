import { OAuth2Client } from 'google-auth-library';
import decryptGoogleToken from '../../auth/googleTokenValidator';
import runtimeConfig from '@config';

jest.mock('google-auth-library', () => {
  const mOAuth2Client = {
    verifyIdToken: jest.fn(),
  };
  return { OAuth2Client: jest.fn(() => mOAuth2Client) };
});

const mockOAuth2Client = new OAuth2Client();

describe('decryptGoogleToken', () => {
  const mockToken = 'mockToken';
  const mockEmail = 'test@example.com';
  const GOOGLE_CLIENT_ID = runtimeConfig.GOOGLE_CLIENT_ID!;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return email when token is valid', async () => {
    (mockOAuth2Client.verifyIdToken as jest.Mock).mockResolvedValue({
      getPayload: () => ({ email: mockEmail }),
    });

    const email = await decryptGoogleToken(mockToken);

    expect(email).toBe(mockEmail);
    expect(mockOAuth2Client.verifyIdToken).toHaveBeenCalledWith({
      idToken: mockToken,
      audience: GOOGLE_CLIENT_ID,
    });
  });

  it('should return undefined and log error when token verification fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (mockOAuth2Client.verifyIdToken as jest.Mock).mockRejectedValue(
      new Error('Token verification failed')
    );

    const email = await decryptGoogleToken(mockToken);

    expect(email).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Google Auth Error:',
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });

  it('should return undefined when payload does not contain email', async () => {
    (mockOAuth2Client.verifyIdToken as jest.Mock).mockResolvedValue({
      getPayload: () => (null),
    });

    const email = await decryptGoogleToken(mockToken);

    expect(email).toBeUndefined();
    expect(mockOAuth2Client.verifyIdToken).toHaveBeenCalledWith({
      idToken: mockToken,
      audience: GOOGLE_CLIENT_ID,
    });
  });
});
