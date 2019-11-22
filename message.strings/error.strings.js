/* 
 * @desription: File for string literal constants for error messages in the
 * fitness app
 */


//WARNING MESSAGES
const WARN_NO_ID = 'There was an error in processing your request. An ID was expected, but not found';
const WARN_NO_DATA_FOUND = 'Unable to retrieve the data associated with request. \n\
    Please try again, if the problem persists please contact customer support.';
const WARN_ONLY_ONE_CHALLENGE = "Only one challenge can be active at a time. When you finish your current challenge, come back and challenge yourself some more!";

//HANDLED EXCEPTION ERRORS

//CRITICAL EXCEPTION ERRORS
const INTERNAL_ERROR = 'There was an internal error. Unable to process request.';

module.exports.WARN_NO_ID = WARN_NO_ID;
module.exports.WARN_NO_DATA_FOUND = WARN_NO_DATA_FOUND;
module.exports.WARN_ONLY_ONE_CHALLENGE = WARN_ONLY_ONE_CHALLENGE;
module.exports.INTERNAL_ERROR = INTERNAL_ERROR;
