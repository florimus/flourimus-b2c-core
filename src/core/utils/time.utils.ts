import moment from 'moment';


const LOCAL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Gets the current time formatted as a string.
 *
 * @returns {string} The current time formatted according to `LOCAL_DATE_TIME_FORMAT`.
 */
export const getCurrentTime = () => {
  const now = moment();
  return now.format(LOCAL_DATE_TIME_FORMAT);
};