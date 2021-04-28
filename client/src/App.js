import React, { Component } from 'react';
import FileList from './components/FileList/FileList.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ContextMenu from './components/ContextMenu/ContextMenu.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';

import { MuiThemeProvider as MaterialUI, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { setContextMenuVisible, refreshFileList } from './actions/Actions.js';
import DynamicSnackbar from './components/Notification/DynamicSnackbar.jsx'; 
import Sidebar from './components/Sidebar/Sidebar.jsx';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    }
});

const contentStyle={
  
    width: 'fit-content'
};


const sidebarStyle={
    height: '100%',
  width: '20%',
  position: 'fixed',
  zIndex: '1',
  top: '30px',
  paddingTop: '30px',
  left:'0',
  overflow:'auto'
};

const contentbarStyle={
    height: '100%',
  width: '80%',
  position: 'fixed',
  zIndex: '1',
  top: '50px',
  paddingTop: '30px',
  right:'0',
  overflow:'auto'

};

const seperator={
    borderLeft: '2px solid grey',
  height: '100%',
  position: 'absolute',
  left: '20%',
  marginLeft: '-3px',
  top: '40px'
}


class App extends Component {

    componentDidMount() {
        this.props.init();
    };

    render() {
        return (
            <MaterialUI theme={theme}>
                <div onClick={this.props.handleHideContextMenu} onContextMenu={this.props.handleHideContextMenu}>
                    <Navbar />
                    <div style={{overflow:'auto'}} ><div style={sidebarStyle} >
                    <Sidebar /></div><div style={seperator}></div><div style={contentbarStyle}>
                    <FileList  /></div>
                    </div>
                    <ContextMenu />
                    <DynamicSnackbar />
                    <Dialogs />
                </div>
            </MaterialUI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(refreshFileList());
        },

        handleHideContextMenu: (event) => {
            if (! (event.target.tagName === 'INPUT' || /label/i.test(event.target.className))) {
                event.preventDefault();
            }
            dispatch(setContextMenuVisible(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);