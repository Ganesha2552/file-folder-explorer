const port=process.env.PORT

const host = 'http://localhost:80';

export default {
    url_list: `${host}/fileexplorer/list`,
    url_get_content: `/fileexplorer/file/info`,
 
    actions: {
        info: true,
    }
};
