const fs=require('fs');
const pathway=require('path')
const creatorName="Ganesha.moorthy";
function getDetails(id)
{
    filepath=Buffer.from(id,"base64").toString("utf-8")
    var stats=fs.lstatSync(filepath);
    stats.path=filepath;
    stats.name=pathway.basename(filepath);
    if(stats.isDirectory()){
        stats.type="folder";
        stats.size =getTotalSize(filepath);        
        stats.creatorname=creatorName
    }else{
        stats.type="file";
        stats.size =convertBytes(stats.size);        
        stats.creatorname=creatorName

        stats.extension=pathway.parse(filepath).ext;

    }
    return stats;
}


const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push( dirPath+"/"+ file);
    }
  })

  return arrayOfFiles
}

const getAllFilesNFolders = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles.push( dirPath+"/"+ file);

      arrayOfFiles = getAllFilesNFolders(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push( dirPath+"/"+ file);
    }
  })

  return arrayOfFiles
}

const convertBytes = function(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  if (bytes == 0) {
    return "n/a"
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  if (i == 0) {
    return bytes + " " + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

const getTotalSize = function(directoryPath) {
  const arrayOfFiles = getAllFiles(directoryPath)

  let totalSize = 0
  arrayOfFiles.forEach((filePath)=> {
    
    totalSize += fs.statSync(filePath).size
  })

  return convertBytes(totalSize)
}

const dirTree=function(parent=null,directoryPath){
  const arrayOfFiles = getAllFilesNFolders(directoryPath);
  let wrapper={}

  arrayOfFiles.forEach((filename)=> {
    var stats = fs.lstatSync(filename)
    parentdetail={
      parentPath:null,parentID:null
    }
    if(filename!==directoryPath){
      parentdir=pathway.parse(filename).dir
      parentfolder=parentdir.replace(directoryPath,"")
      parentdetail.parentPath=(parentfolder===""?"/":parentfolder);
      parentdetail.parentID=Buffer.from(parentdir).toString('base64')
    }else{
      
      parentdetail.parentPath="/";
      parentdetail.parentID=Buffer.from(directoryPath).toString('base64')
    }
  
    var stats = fs.lstatSync(filename)
    var idval=Buffer.from(filename).toString('base64')
    console.log(filename);
    let info ={
            path: filename,
            name: pathway.basename(filename),
            parentPath: parentdetail.parentPath,
            parentID: parentdetail.parentID,
            date:stats.birthtime
        };
        console.log(stats.isDirectory())
    if (stats.isDirectory()) {
        info.type = "folder";
        info.size =getTotalSize(filename);
        info.creatorname=creatorName;
        info.children=[];
        console.log("Filename::"+filename)
        fs.readdirSync(filename).map(function(child) {
          let childid=Buffer.from(child).toString('base64');
          info.children.push(childid);          
        });
      }
     else {
       
        info.type = "file";
        info.size =convertBytes(stats["size"]);        
        info.creatorname=creatorName
        info.children=[]
        info.extension=pathway.parse(filename).ext;
    }
   wrapper[idval]=info;
  })
  return wrapper;

  }




function dirTree2(parent=null,filename) {
    parentdetail={
      parentPath:null,parentID:null
    }
    if(parent!=null){
      //filename=parent+"/"+filename;
      parentdetail.parentPath=parent;
      parentdetail.parentID=Buffer.from(parent).toString('base64')
    }
  
    var stats = fs.lstatSync(filename)
    var idval=Buffer.from(filename).toString('base64')
    wrapper={}
    console.log(filename);
    let info ={
            id:idval,
            path: filename,
            name: pathway.basename(filename),
            parentPath: parentdetail.parentPath,
            parentID: parentdetail.parentID
        };
        console.log(stats.isDirectory())
    if (stats.isDirectory()) {
        info.type = "folder";
        info.size =getTotalSize(filename);
        info.creatorname=creatorName;
       // info.children=[];
        console.log("Filename::"+filename)
        info.children=fs.readdirSync(filename).map(function(child) {
          let childid=Buffer.from(child).toString('base64');
          return dirTree2(filename,filename+"/"+child);
          
        });
      }
     else {
       
        info.type = "file";
        info.size =convertBytes(stats["size"]);        
        info.creatorname=creatorName
        info.children=[]
        info.extension=pathway.parse(filename).ext;
    }

    return info;
    
}


module.exports = {dirTree,getDetails,dirTree2,convertBytes};