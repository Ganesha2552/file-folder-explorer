folders= require('./router/api/Folders');
const express=require('express');
const app = express();
const utils =require('./util/file_util');
const paths=require( 'path');

const port = process.env.PORT || 80; // process.env.port is Heroku's port 
app.listen(port, () => console.log("Hello world app listening on port "+`${port}`+"!"));
// Routes
app.use('/api/files',folders);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use('*',(req,res)=>{
    res.sendFile(paths.resolve(__dirname + '/client/build/index.html'))
  });
}

  

const fs = require('fs');

app.use(express.json());

const apiResponse = (res, status = 200) =>
  (data, success = true, errorMsg = null, error = null) =>
    res.status(status).json({
      data,
      success,
      errorMsg,
      error,
    });

const apiError = (res, status = 500) =>
  (errorMsg = null, error = null) =>
    apiResponse(res, status)(null, false, errorMsg, error);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,path');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/fileexplorer/list', (req, res) => {
  const path = req.query.path || '.';

  fs.readdir(path, (err, files) => {
    if (err) {
      return apiError(res)('Cannot read that folder', err);
    }
    let extensionscountObj={}
    let extensionscount=0;
    let filesnoextcount=0;
    let distinctExt=[];
    let filescount=0;
    const items = (files || []).map((f) => {
      const fpath = `${path}/${f}`;
      let type = 'file';
      let size = 0;
      let createdAt = null;
      let updatedAt = null;
      
      try {
        const stat = fs.statSync(fpath);
        type = stat.isDirectory() ? 'dir' : type;
        size = utils.convertBytes(stat.size) || utils.convertBytes(size);
        createdAt = stat.birthtimeMs;
        updatedAt = stat.mtimeMs;
        console.log(type)
        if(type==='file'){
        filescount= filescount+1;
        let extn=paths.parse(fpath).ext;
        if(extn==null||extn==undefined|| extn===""){
          extn='no_extn';
        }
        console.log(extn)
        console.log(extensionscountObj[extn])
        console.log(filescount)

        if(extensionscountObj[extn]!=null || extensionscountObj[extn]!=undefined){
          extensionscountObj[extn]=extensionscountObj[extn]+1;
        }else{
          extensionscountObj[extn]=1;
        }
        distinctExt=Object.keys(extensionscountObj).join(',')
        console.log(distinctExt)
        filesnoextcount=extensionscountObj['no_extn']
        console.log(filesnoextcount)
        extensionscount=Object.keys(extensionscountObj).length

        }
      } catch (e) {
        return null;
      }
      return {
        name: f,
        path: fpath,
        type,
        size,
        createdAt,
        updatedAt,
        filescount,
        extensionscount,
        distinctExt,
        filesnoextcount
      };
    }).filter(Boolean);
    return apiResponse(res)(items);
  });
});







