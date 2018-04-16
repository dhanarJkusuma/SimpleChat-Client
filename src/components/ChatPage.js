import React from 'react';
// templating import
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
// templating engine
import { withStyles } from 'material-ui/styles';
// prop-types
// import PropTypes from 'prop-types';

// catch component from available component
import ChatBubble from './common/ChatBubble';
import ChatBox from './common/ChatBox';

// import SockJS
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// import external css
import './ChatPage.css';

// define styles
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    height: '80%'
  })
});

class ChatPage extends React.Component {

  state = {
    stompClient: null,
    username: '',
    chat: []
  }

  constructor(){
    super();
    this.stompClient = null;
  }

  componentDidMount = () => {
    this.initConnectionSockJS();
    let session = localStorage.getItem('SimpleChat-Username');
    if(typeof session !== 'undefined'){
      this.setState({ username: session });
    }
  }

  initConnectionSockJS = () => {
    let serverUrl = 'http://localhost:8080/chat-socket';
    let ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body){
          that.parseMessageStream(message.body);
        }
      });
    });
  }

  // parse object send
  parseMessageStream = (messageStream) => {
    let fragmentString = messageStream.split(':');
    let sender = fragmentString[0];
    let messageFrom = messageStream.indexOf(sender) + sender.length + 1;
    let message = messageStream.substring(messageFrom, messageStream.length);
    var me = false;
    if(sender === this.state.username){
      me = true;
    }

    let chatBody = {
      sender,
      message,
      me
    }
    this.setState({
      chat: [...this.state.chat, chatBody]
    })

    console.log("sender : " + sender);
    console.log("message : " + message);
  }

  // method needed for sending message
  sendMessage = (data) => {
    let messageStream = data.username + ":" + data.message;
    this.stompClient.send("/app/chat" , {}, messageStream);
  }

  // start render
  render(){
    const { classes } = this.props;
    let messages = this.state.chat.map((c, index) => {
      let type = c.me ? "me" : "guest";
      return (
        <ChatBubble key={index} type={ type } sender={ c.sender } message={ c.message } />
      )
    });
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            SimpleChat!
          </Typography>
          <br />
          <div className="chat-content">
            { messages }
          </div>
          <div className="chat-box">
            <ChatBox
              handleSendMessage={ this.sendMessage } />
          </div>
        </Paper>
      </div>
    );
  }
  // end render
}

ChatPage.propTypes = {

}

const styledComponent = withStyles(styles)(ChatPage);
export default styledComponent;
