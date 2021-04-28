import config from './../config.js';

/**
 * Fetch API to list files from directory
 * @param {String} path
 * @returns {Object}
 */
export function list(path) {
    return fetch(config.url_list + '?path=' + (encodeURIComponent(path) || '/'));
};






/**
 * Fetch API to get file info
 * @param {String} path
 * @returns {Object}
 */
 export function getFileInfo(path) {
    return fetch(config.url_get_content + '?path=' + (encodeURIComponent(path) || '/'));
};




