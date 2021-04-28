import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { enterToDirectory } from '../../../actions/Actions.js';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { getFileInfo } from '../../../Api/Api.js';

function OpenAction(props) {
    const {handleClick, selectedFiles} = props;
    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
            <ListItemIcon>
                <OpenInBrowserIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Open
            </Typography>
        </MenuItem>        
    );
}

const mapStateToProps = (state) => {
    return {
        selectedFiles: state.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick: (event, selectedFiles) => {
            if (selectedFiles[0].type === 'dir') {
                dispatch(enterToDirectory(selectedFiles[0].name));
                return;
            }
            dispatch(getFileInfo(selectedFiles[0].name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAction);
