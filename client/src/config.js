const port=process.env.PORT

const host = 'https://folder-file-explorer.herokuapp.com:'+port;

export default {
    url_list: `${host}/fileexplorer/list`,
    url_get_content: `${host}/fileexplorer/file/info`,
 
    actions: {
        info: true,
    }
};
