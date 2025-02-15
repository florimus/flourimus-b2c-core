import { comparePassword, hashPassword } from '../../core/utils/password.utils';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('password.utils', () => {
    describe('hashPassword', () => {
        it('should hash the password using bcrypt', async () => {
            const password = 'plainPassword';
            const hashedPassword = 'hashedPassword';
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

            const result = await hashPassword(password);

            expect(bcrypt.hash).toHaveBeenCalledWith(password, expect.any(Number));
            expect(result).toBe(hashedPassword);
        });
    });

    describe('comparePassword', () => {
        it('should return true if passwords match', async () => {
            const password = 'plainPassword';
            const hash = 'hashedPassword';
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await comparePassword(password, hash);

            expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
            expect(result).toBe(true);
        });

        it('should return false if passwords do not match', async () => {
            const password = 'plainPassword';
            const hash = 'hashedPassword';
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const result = await comparePassword(password, hash);

            expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
            expect(result).toBe(false);
        });
    });
});