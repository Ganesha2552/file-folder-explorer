import * as APIHandler from '../Api/ApiHandler.js';

/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileList = () => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setLoading(true));
    dispatch(setSelectedFiles([]));

    APIHandler.getFileList(path.join('/')).then(r => {
        dispatch(setLoading(false));
        dispatch(setFileList(r));
    }).catch(r => {
        dispatch(setFileList([]));
        dispatch({
            type: 'SET_ERROR_MSG',
            value: r.toString()
        });
        dispatch(setLoading(false));
    });
};


/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileListSublist = () => (dispatch, getState) => {
    const { pathSublist } = getState();
    dispatch(setLoadingSublist(true));
    dispatch(setSelectedFolderSublist(null));

    APIHandler.getFileList(pathSublist.join('/')).then(r => {
        dispatch(setLoadingSublist(false));
        dispatch(setFileListSublist(r));
    }).catch(r => {
        dispatch(setFileListSublist([]));
        dispatch({
            type: 'SET_ERROR_MSG',
            value: r.toString()
        });
        dispatch(setLoadingSublist(false));
    });
};

/**
 * Request API to get file content then dispatch defined events
 * @param {String} fileName
 * @returns {Function}
 */
 export const getFileInfo = (fileName) => (dispatch, getState) => {
    const { path } = getState();

    dispatch(setLoading(true));
    dispatch(setFileInfo(null));
    dispatch(setVisibleDialogContent(true));
    APIHandler.getFileInfo(path.join('/'), fileName).then(blob => {
        dispatch(setFileInfo(blob));
        dispatch(setLoading(false));
    }).catch(r => {
        dispatch({
            type: 'SET_ERROR_MSG',
            value: r.toString()
        });
        dispatch(setLoading(false));
    });
};




/**
 * @returns {Function}
 */
export const initSubList = () => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setSelectedFolderSublist(null));
    dispatch(setFileListSublist([]));    
    dispatch(setPathSublist([...path]));
    dispatch(refreshFileListSublist());
};



export const enterToPreviousDirectory = () => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setPath(path.slice(0, -1)));
    dispatch(setFileListFilter(null));
    dispatch(refreshFileList());
};

export const enterToPreviousDirectoryByIndex = (index) => (dispatch, getState) => {
    const { path } = getState();
    const newPath = [...path].slice(0, ++index);
    dispatch(setPath(newPath));
    dispatch(refreshFileList());
    dispatch(setFileListFilter(null));
};

export const enterToPreviousDirectorySublist = () => (dispatch, getState) => {
    const { pathSublist } = getState();
    dispatch(setPathSublist(pathSublist.slice(0, -1)));
    dispatch(refreshFileListSublist());
};

export const setPath = (path) => {
    return {
        type: 'SET_PATH',
        value: path
    };
};

export const setPathSublist = (path) => {
    return {
        type: 'SET_PATH_SUB_LIST',
        value: path
    };
};

export const enterToDirectory = (directory) => (dispatch, getState) => {
    dispatch({
        type: 'ENTER_TO_DIRECTORY',
        value: directory
    });
    dispatch(setFileListFilter(null));
    dispatch(refreshFileList());
};

export const enterToDirectorySublist = (directory) => (dispatch, getState) => {
    dispatch({
        type: 'ENTER_TO_DIRECTORY_SUB_LIST',
        value: directory
    });
    dispatch(refreshFileListSublist());
};

export const setFileList = (fileList) => {
    return {
        type: 'SET_FILE_LIST',
        value: fileList
    };
};

export const setFileListSublist = (fileList) => {
    return {
        type: 'SET_FILE_LIST_SUB_LIST',
        value: fileList
    };
};

export const setSelectedFiles = (files) => {
    return {
        type: 'SET_SELECTED_FILES',
        value: files
    };
};

export const setSelectedFolderSublist = (file) => {
    return {
        type: 'SET_SELECTED_FOLDER_SUB_LIST',
        value: file
    };
};

export const setFileListFilter = (search) => {
    return {
        type: 'SET_FILE_LIST_FILTER',
        value: search
    };
};

export const setContextMenuVisible = (visible) => {
    return {
        type: 'SET_CONTEXT_MENU_VISIBLE',
        value: !!visible
    };
};

export const setContextMenuPosition = (x, y) => {
    return {
        type: 'SET_CONTEXT_MENU_POSITION',
        value: [x, y]
    };
};

export const setContextMenuPositionElement = (element) => {
    return {
        type: 'SET_CONTEXT_MENU_POSITION_ELEMENT',
        value: element
    };
};

export const toggleSelectedFile = (file) => {
    return {
        type: 'TOGGLE_SELECTED_FILE',
        value: file
    };
};

export const rightClickOnFile = (file) => (dispatch, getState) => {
    const { selectedFiles } = getState();
    const isSelected = selectedFiles.indexOf(selectedFiles.find(f => f.name === file.name)) !== -1;

    !isSelected && dispatch(setSelectedFiles([file]));
};

export const setLoading = (value) => {
    return {
        type: 'SET_LOADING',
        value: value
    };
};

export const setLoadingSublist = (value) => {
    return {
        type: 'SET_LOADING_SUB_LIST',
        value: value
    };
};



export const setVisibleDialogContent = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_CONTENT',
        value: !!visible
    };
};



export const setFileInfo = (blob) => {
    return {
         type: 'SET_FILE_INFO',
         value: blob
     };
 };
 

