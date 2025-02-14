import createRouter from '../../core/router';
import errorBoundary from '@src/errorBoundary';

const mockRouter = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    use: jest.fn(),
};

jest.mock('express', () => ({
    Router: jest.fn(() => mockRouter),
}));

jest.mock('@src/errorBoundary', () => jest.fn((handler) => handler));

describe('createRouter', () => {
    let router: ReturnType<typeof createRouter>;

    beforeEach(() => {
        router = createRouter();
    });

    it('should create a router instance', () => {
        expect(router).toBeDefined();
        expect(router.getRouter()).toBeDefined();
    });

    it('should add GET route', () => {
        const path = '/test-get';
        const handler = jest.fn();
        router.get(path, handler);
        expect(mockRouter.get).toHaveBeenCalledWith(path, handler);
    });

    it('should add POST route', () => {
        const path = '/test-post';
        const handler = jest.fn();
        router.post(path, handler);
        expect(mockRouter.post).toHaveBeenCalledWith(path, handler);
    });

    it('should add PUT route', () => {
        const path = '/test-put';
        const handler = jest.fn();
        router.put(path, handler);
        expect(mockRouter.put).toHaveBeenCalledWith(path, handler);
    });

    it('should add DELETE route', () => {
        const path = '/test-delete';
        const handler = jest.fn();
        router.delete(path, handler);
        expect(mockRouter.delete).toHaveBeenCalledWith(path, handler);
    });

    it('should add PATCH route', () => {
        const path = '/test-patch';
        const handler = jest.fn();
        router.patch(path, handler);
        expect(mockRouter.patch).toHaveBeenCalledWith(path, handler);
    });

    it('should add middleware', () => {
        const path = '/test-use';
        const handler = jest.fn();
        router.use(path, handler);
        expect(mockRouter.use).toHaveBeenCalledWith(path, handler);
    });

    it('should wrap handlers with errorBoundary', () => {
        const path = '/test-error-boundary';
        const handler = jest.fn();
        router.get(path, handler);
        expect(errorBoundary).toHaveBeenCalledWith(handler);
    });
});