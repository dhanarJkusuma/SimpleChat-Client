import React from 'react';
import Snackbar from 'material-ui/Snackbar';

// import proptypes
import PropTypes from 'prop-types';

class SnackBarMessage extends React.Component {

  handleInnerClose = () => {
    this.props.handleClose();
  }

  render(){
    let positionSnackbar = {
      'horizontal' : 'center',
      'vertical' : 'top'
    }
    return (
      <Snackbar
         anchorOrigin={ positionSnackbar }
         open={ this.props.open }
         onClose={ this.handleInnerClose }
         SnackbarContentProps={{
           'aria-describedby': 'message-id',
         }}
         message={ this.props.message }
       />
    );
  }
}

SnackBarMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default SnackBarMessage;
