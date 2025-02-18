import BadRequest from '@src/errorBoundary/custom/badrequest.error';
import statusCodes from '@core/statusCodes';

describe('BadRequest', () => {
    it('should create an instance of BadRequest with the correct message and status code', () => {
        const message = 'This is a bad request';
        const error = new BadRequest(message);

        expect(error).toBeInstanceOf(BadRequest);
        expect(error.message).toBe(message);
        expect(error.status).toBe(statusCodes.BAD_REQUEST);
        expect(error.name).toBe('BadRequest');
    });

    it('should have a status code of 400', () => {
        const error = new BadRequest('Bad request error');
        expect(error.status).toBe(400);
    });

    it('should have the correct name', () => {
        const error = new BadRequest('Bad request error');
        expect(error.name).toBe('BadRequest');
    });
});