import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';

// prop-types
import PropTypes from 'prop-types';

// templating engine
import { withStyles } from 'material-ui/styles';

// import css
import './ChatBubble.css';

// define styles
const styles = theme => ({
  bubbleRoot: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    width: 200,
    boxShadow: 'none',
    marginLeft: 'auto',
    marignRight: 0,
    backgroundColor: '#ECEFF1'
  }),
  bubbleMe: theme.mixins.gutters({
    marginLeft: 0,
    marignRight: 'auto',
    backgroundColor: '#C5E1A5'
  })
});


class ChatBubble extends React.Component {
  render(){
    const { classes, type, sender, message } = this.props;
    const senderAlign = ( type === 'me') ? 'left' : 'right';
    var bubbleContent = (
      <div className="bubble">
        <Typography
          variant="caption"
          gutterBottom
          align={ senderAlign }>
          { sender }
        </Typography>
        <Paper
          className={classNames(
            classes.bubbleRoot,
            {
              [classes.bubbleMe]: type === 'me',
            }
          )}
          square={ false }>
          { message }
        </Paper>
      </div>
    );

    return bubbleContent;
  }
}

ChatBubble.propType = {
  type: PropTypes.object.isRequired,
  sender: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

const styledComponent = withStyles(styles)(ChatBubble);
export default styledComponent;
