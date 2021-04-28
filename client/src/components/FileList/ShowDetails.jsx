import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ShowDetails extends Component {
    
    render() {
        const  makeStyles={
            root: {
              minWidth: 275,
            },
            bullet: {
              display: 'inline-block',
              margin: '0 2px',
              transform: 'scale(0.8)',
            },
            title: {
              fontSize: 14,
            },
            pos: {
              marginBottom: 12,
            },
          };
          const { filescount=0,
            extensionscount,
            distinctExt,
            filesnoextcount} = this.props;

          const bull = <span className={makeStyles.bullet}>•</span>;
        return (
            <Card className={makeStyles.root} variant="outlined">
      <CardContent>
        <Typography className={makeStyles.title} color="textSecondary" gutterBottom>
        Total Number of Files : 
        </Typography>
        <Typography variant="h5" component="h2">
        {filescount}
        </Typography>
        <Typography className={makeStyles.title} color="textSecondary" gutterBottom>
        Total Number of Files Extensions: 
        </Typography>
        <Typography variant="h5" component="h2">
        {extensionscount}
        </Typography>
        <Typography className={makeStyles.title} color="textSecondary" gutterBottom>
        List of All Extension : 
        </Typography>
        <Typography variant="h5" component="h2">
        {distinctExt}
        </Typography>
        <Typography className={makeStyles.title} color="textSecondary" gutterBottom>
        Total Number of File with no extensions : 
        </Typography>
        <Typography variant="h5" component="h2">
        {filesnoextcount}
        </Typography>
      </CardContent>
      
    </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
    };
};
ShowDetails.propTypes = {
    filescount:PropTypes.number.isRequired,
    extensionscount:PropTypes.number.isRequired,
    distinctExt:PropTypes.string.isRequired,
    filesnoextcount:PropTypes.number.isRequired


};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetails)
