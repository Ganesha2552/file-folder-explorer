import * as API from './Api.js';
import config from './../config.js';

const messageTranslation = {
    'unknown_response': 'Unknown error response from connector',
    'TypeError: Failed to fetch': 'Cannot get a response from connector.',
};

/**
 * Response handler for fetch responses
 * @param {Function} resolve
 * @param {Function} reject
 * @returns {Object}
 */
const handleFetch = (resolve, reject) => {
    return {
        xthen: (response) => {
            const contentType = response.headers.get('content-type');
            const contentDisp = response.headers.get('content-disposition');
            const isJson = /(application|text)\/json/.test(contentType);
            const isAttachment = /attachment/.test(contentDisp);

            if (! response.ok) {
                if (isJson) {
                    throw response.json();
                }
                throw Error(messageTranslation['unknown_response']);
            }

            if (isAttachment) {
                response.blob().then(blob => {
                    resolve(blob);
                });
                return;
            }

            if (isJson) {
                response.json().then(json => {
                    if (! json.success) {
                        throw new Error();
                    }
                    resolve(json.data);
                });
                return;
            }
        },
        xcatch: (errorResponse) => {
            // is thrown json
            if (errorResponse && errorResponse.then) {
                errorResponse.then(errJson => {
                    return reject(errJson.errorMsg || JSON.stringify(errJson));
                });
            } else {
                return reject(messageTranslation[errorResponse] || errorResponse);
            }
        }
    }
}

/**
 * Clean path string removing double slashes and prepending a slash
 * @param {String} path
 * @returns {String}
 */
const fixPath = (path) => {
    return ('/' + path).replace(/\/\//g, '/');
};

/**
 * Wrap API response for retrive file liest
 * @param {String} path
 * @returns {Object}
 */
export const getFileList = (path) => {
    path = fixPath(path);
    return new Promise((resolve, reject) => {
        return API.list(path)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};

/**
 * Wrap API response for retrive file info
 * @param {String} path
 * @returns {Object}
 */
 export const getFileInfo = (path, filename) => {
    path = fixPath(path + '/' + filename);
    return new Promise((resolve, reject) => {
        return API.getFileInfo(path)
            .then(handleFetch(resolve, reject).xthen)
            .catch(handleFetch(resolve, reject).xcatch)
    })
};









/**
 * Calculate available actions for a file
 * @param {Object} file
 * @returns {Array<String>}
 */
export const getActionsByFile = (file, acts = []) => {
    if (file.type === 'dir') {
        acts.push('open');

        typeof file.compressible !== 'undefined' ?
            file.compressible && acts.push('compress'):
            acts.push('compress');
    }

    if (file.type === 'file') {
        acts.push('download');
        config.isImageFilePattern.test(file.name) && acts.push('info');

        typeof file.editable !== 'undefined' ?
            file.editable && acts.push('edit'):
            config.isEditableFilePattern.test(file.name) && acts.push('edit');
        
        typeof file.extractable !== 'undefined' ?
            file.extractable && acts.push('extract'):
            config.isExtractableFilePattern.test(file.name) && acts.push('extract');

        acts.push('copy');
    }


    return acts;
}

/**
 * Calculate available actions for selected files, excluding non coincidences
 * @param {Array<Object>} files
 * @returns {Array<String>}
 */
export const getActionsByMultipleFiles = (files, acts = []) => {
    files.forEach(file => {
        const fileActs = getActionsByFile(file);
        // intersects previous actions with the following to leave only coincidences
        acts = acts.length ? acts.filter(value => -1 !== fileActs.indexOf(value)) : fileActs;
    });

    if (files.length > 1) {
        acts.splice(acts.indexOf('open'), acts.indexOf('open') >= 0);
    }
    return acts;
}

