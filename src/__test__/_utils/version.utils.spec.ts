import versionControl from '@core/utils/version.utils';

describe('versionControl', () => {
    it('should increment the version number by 1 when a version is provided', () => {
        const result = versionControl('admin@hgmail.com', 1);
        expect(result.version).toBe(2);
    });

    it('should return version 1 when no version is provided', () => {
        const result = versionControl('admin@hgmail.com');
        expect(result.version).toBe(1);
    });

    it('should increment the version number by 1 when a version greater than 1 is provided', () => {
        const result = versionControl('admin@hgmail.com', 5);
        expect(result.version).toBe(6);
    });

    it('should handle zero as a version number correctly', () => {
        const result = versionControl('admin@hgmail.com',0);
        expect(result.version).toBe(1);
    });
});