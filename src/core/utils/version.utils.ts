import { getCurrentTime } from '@core/utils/time.utils';

/**
 * Increments the given version number by 1. If no version number is provided, it defaults to 1.
 *
 * @param {number} [version] - The current version number.
 * @returns {{ version: number }} An object containing the new version number.
 */
const versionControl = (updatedBy: string, version?: number) => {
  const newVersion = version ? version + 1 : 1;
  return {
    updatedBy,
    version: newVersion,
    updatedAt: getCurrentTime(),
  };
};

export default versionControl;
