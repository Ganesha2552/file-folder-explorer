import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from '../File/File.jsx'; 
import FileListEmptyMessage from './FileListEmptyMessage';
import Loader from '../Loader/Loader.jsx'; 
import './FileList.css';
import ShowDetails from './ShowDetails.jsx';

class FileList extends Component {
    
    render() {
        const { fileList, loading } = this.props;
        var filescount=0;
        var extensionscount=0;
        var distinctExt=[];
        var filesnoextcount=0;
        const fileListComponent = fileList.map((file, key) => {
            if (file.type=='file'){
                filescount=file.filescount;
                extensionscount=file.extensionscount;
                distinctExt=file.distinctExt;
                filesnoextcount=file.filesnoextcount;
            }
            return <File type={file.type} name={file.name} editable={file.editable} size={file.size} key={key} sidebar={false} />
        });
        console.log(distinctExt)
        return <div className="FileList">{!loading?<ShowDetails filescount={filescount} extensionscount={extensionscount} distinctExt={distinctExt} filesnoextcount={filesnoextcount}/>:<div></div>}

                        { loading ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : <FileListEmptyMessage />
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    const filteredList = state.fileList.filter(
        file => state.fileListFilter ? file.name.toLocaleLowerCase().match(state.fileListFilter.toLocaleLowerCase()) : true
    );
    return {
        fileList: filteredList,
        loading: state.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);


