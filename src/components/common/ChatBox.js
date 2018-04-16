import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

// icons
import Send from '@material-ui/icons/Send';

// import propTypes
import PropTypes from 'prop-types';

// style engine
import { withStyles } from 'material-ui/styles';


// define styles
const styles = theme => ({
  chatBoxRoot: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none',
    marginLeft: 0,
    marignRight: 'auto',
    backgroundColor: '#FAFAFA'
  }),
  buttonRoot: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none',
    marginLeft: 0,
    marignRight: 'auto',
    padding: 3,
    textAlign: 'center'
  }),
  iconRoot: theme.mixins.gutters({
    marginTop: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 0,
    color: '#558B2F'
  })
});

class ChatBox extends React.Component {

  state = {
    data: {
      username: '',
      message: ''
    }
  }

  componentDidMount = () => {
    let session = localStorage.getItem('SimpleChat-Username');
    if(typeof session !== 'undefined'){
      this.setState({
        data: {
          ...this.state.data,
          username: session
        }
      });
    }

  }

  handleEventEnter = (event) => {
    if (event.key === 'Enter') {
      // sending message
      this.props.handleSendMessage(this.state.data);
      this.resetBoxMessage();
      event.preventDefault();
    }
  }

  onClickSend = (event) => {
    this.props.handleSendMessage(this.state.data);
    this.resetBoxMessage();
  }

  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  }

  // method needed for clear message box
  resetBoxMessage = () => {
    this.setState({
      data: {
        ...this.state.data,
        message: ''
      }
    });
  }

  render(){
    const { classes } = this.props;
    let messageBox = (
      <div className="chatbox">
        <Paper
          className={ classes.chatBoxRoot }
          square={ false }>
          <TextField
            id="full-width"
            label="Pesan"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Tulis Sesuatu ..."
            fullWidth
            margin="normal"
            name="message"
            value={ this.state.data.message }
            onChange={ this.onChange }
            onKeyPress={ this.handleEventEnter }
          />
        </Paper>
      </div>
    );
    let buttonBox = (
      <Paper
        className={ classes.buttonRoot }
        onClick={ this.onClickSend }
        >
        <Send
          className={ classes.iconRoot }
          style={{ fontSize: 35, padding: 5 }}
        />
      </Paper>
    )
    return (
      <Grid container>
        <Grid item xs={11}>
          { messageBox }
        </Grid>
        <Grid item xs={1}>
          { buttonBox }
        </Grid>
      </Grid>
    );
  }

}


ChatBox.propTypes = {
  handleSendMessage: PropTypes.func.isRequired
}


const styledComponent = withStyles(styles)(ChatBox);
export default styledComponent;
