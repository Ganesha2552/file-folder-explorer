import React, { Component } from 'react';
import File from '../File/File.jsx'; 
import FileListEmptyMessage from '../FileList/FileListEmptyMessage';
import Loader from '../Loader/Loader.jsx'; 
import { connect } from 'react-redux';


class Sidebar extends Component {

    render() {
        const { fileList, loading } = this.props;
        
        const fileListComponent = fileList.map((file, key) => {
            if(file.type==='dir'){
                console.log(file.name)
            return <File type={file.type} name={file.name} editable={file.editable} size={file.size} key={key} sidebar={true} />
            }
        });

        return <div className="FileList">
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);