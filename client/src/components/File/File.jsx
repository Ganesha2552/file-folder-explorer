import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    enterToDirectory, setContextMenuVisible, toggleSelectedFile, setContextMenuPosition, getFileInfo, 
    rightClickOnFile, setSelectedFiles
} from '../../actions/Actions.js';
import './File.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import blue from '@material-ui/core/colors/blue';
import config from '../../config.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import IconButton from '@material-ui/core/IconButton'
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';

class File extends Component {
    render() {
        const { isSelected, type, name, size, handleClick, handleDoubleClick, handleContextMenu ,sidebar} = this.props;
        const avatarStyle = {
            backgroundColor: isSelected ? blue['A200'] : null
        };
        const realSize = typeof size !== 'undefined' && type !== 'dir' ? size : null;
        if(sidebar){
            return(
                <div  onClick={handleClick} onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu} data-selected={isSelected}>

                <ListItem button>
                <ListItemAvatar>
                    <Avatar style={avatarStyle}>
                        <FolderRoundedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="filename" primary={name} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="slidedown">
                        <ExpandMoreIcon style={{ fontSize: 40,align:'center' }}></ExpandMoreIcon>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            </div>
            )
        }else{
        return (
            <div className="File" onClick={handleClick} onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu} data-selected={isSelected}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={avatarStyle}>
                            { type === 'dir' ? <FolderIcon /> : <FileIcon />}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className="filename" primary={name} secondary={realSize} />
                </ListItem>
            </div>
        );
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        filePath: [...state.path, ownProps.name],
        isSelected: !!state.selectedFiles.find(f => f.name === ownProps.name)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleDoubleClick: (event) => {
            if (ownProps.type === 'file') {
                dispatch(getFileInfo(ownProps.name));
             
                return;
            }

            dispatch(enterToDirectory(ownProps.name));
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleContextMenu: (event) => {
            event.preventDefault();
            event.stopPropagation();

            const x = event.clientX || (event.touches && event.touches[0].pageX);
            const y = event.clientY || (event.touches && event.touches[0].pageY);

           
                dispatch(rightClickOnFile(ownProps));
            
            
            dispatch(setContextMenuVisible(true));
            dispatch(setContextMenuPosition(x, y));
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleClick: (event) => {
            event.stopPropagation();

            if (event.ctrlKey) {
                dispatch(toggleSelectedFile(ownProps));
            }  else {
                dispatch(setSelectedFiles([ownProps]));
            }
        }
    };
};

File.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(File);

