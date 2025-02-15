import { OAuth2Client } from 'google-auth-library';
import runtimeConfig from '@config';

const GOOGLE_CLIENT_ID = runtimeConfig.GOOGLE_CLIENT_ID!;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Decrypts a Google ID token and retrieves the email from the token's payload.
 *
 * @param token - The Google ID token to be decrypted.
 * @returns {email | undefined} The email address from the token's email, or undefined if an error occurs.
 * @throws Will log an error message if the token verification fails.
 */
const decryptGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return payload?.email;

  } catch (error) {
    console.error('Google Auth Error:', error);
  }
};

export default decryptGoogleToken;
