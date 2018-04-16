import React from 'react';
// templating import
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// templating engine
import { withStyles } from 'material-ui/styles';
// prop-types
import PropTypes from 'prop-types';

// import external css
import './ChatLogin.css';

// import another components
import SnackBarMessage from './common/SnackBarMessage';

// define styles
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    height: '80%',
    marginLeft:'auto',
    marginRight:'auto',
    width: '40%',
  }),
  rootPage: theme.mixins.gutters({

  }),
  usernameBox: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none',
    marginLeft: 0,
    marignRight: 'auto',
    backgroundColor: '#FAFAFA'
  }),
  button: {
    margin: theme.spacing.unit,
  },
});


class ChatLogin extends React.Component {

  // init state
  state = {
    showSnackBar: false,
    errorMessage: "",
    username: ""
  }

  // method needed for SnackBarMessage
  handleSnackBarClose = () => {
    this.setState({ showSnackBar: false });
  }

  // method needed for ChatLogin
  handleLogin = () => {
    if(this.state.username.trim().length === 0){
      this.setState({ showSnackBar: true, errorMessage: "Username tidak boleh kosong." });
    }else{
      // save session username
      localStorage.setItem('SimpleChat-Username', this.state.username);
      // change route
      this.props.history.push('/chat');
    }
  }

  // method needed for input
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    const { classes } = this.props;
    let usernameBox = (
      <div className="chatbox">
        <Paper
          className={ classes.usernameBox }
          square={ false }>
          <TextField
            id="full-width"
            label="Username"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Tulis Namamu ..."
            fullWidth
            margin="normal"
            name="username"
            onChange={ this.onChange }
          />
        </Paper>
      </div>
    );
    return (
      <div className={ classes.rootPage }>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Selamat Datang di SimpleChat!
          </Typography>
          { usernameBox }
          <Button variant="raised" color="primary" className={ classes.button } onClick={ this.handleLogin } >
            Masuk Chat Room
          </Button>
        </Paper>
        <SnackBarMessage
          message={ this.state.errorMessage }
          open={ this.state.showSnackBar }
          handleClose={ this.handleSnackBarClose }
        />
      </div>
    )
  }
}

ChatLogin.propTypes = {
  history: PropTypes.shape({
   push: PropTypes.func.isRequired
  }).isRequired
}


const styledComponent = withStyles(styles)(ChatLogin);
export default styledComponent;
