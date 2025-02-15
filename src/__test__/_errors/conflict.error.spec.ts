import Conflict from '@src/errorBoundary/custom/conflict.error';
import statusCodes from '@core/statusCodes';

describe('Conflict Error', () => {
    it('should create an instance of Conflict error with the correct message and status code', () => {
        const message = 'This is a conflict error';
        const error = new Conflict(message);

        expect(error).toBeInstanceOf(Conflict);
        expect(error.message).toBe(message);
        expect(error.status).toBe(statusCodes.CONFLICT);
        expect(error.name).toBe('Conflict');
    });

    it('should have a status code of 409', () => {
        const error = new Conflict('Conflict error');
        expect(error.status).toBe(409);
    });
});