import statusCodes from '../../core/statusCodes';

describe('statusCodes', () => {
    it('should have a status code for OK', () => {
        expect(statusCodes.OK).toBe(200);
    });

    it('should have a status code for CREATED', () => {
        expect(statusCodes.CREATED).toBe(201);
    });

    it('should have a status code for BAD_REQUEST', () => {
        expect(statusCodes.BAD_REQUEST).toBe(400);
    });

    it('should have a status code for UNAUTHORIZED', () => {
        expect(statusCodes.UNAUTHORIZED).toBe(401);
    });

    it('should have a status code for FORBIDDEN', () => {
        expect(statusCodes.FORBIDDEN).toBe(403);
    });

    it('should have a status code for NOT_FOUND', () => {
        expect(statusCodes.NOT_FOUND).toBe(404);
    });

    it('should have a status code for SERVER_ERROR', () => {
        expect(statusCodes.SERVER_ERROR).toBe(500);
    });
});