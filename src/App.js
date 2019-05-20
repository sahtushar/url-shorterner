import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'center',
    border:'2px black'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    textAlign:'center'
  },
  center:{
    textAlign:'center'
  },
  formStyle:{
    padding: '10px',
    border: '2px solid whitesmoke'
  }

});

class TextFields extends React.Component {
  state = {
    url:''
  };

  handleChange = url => event => {
    this.setState({ [url]: event.target.value });
    this.setState({originalUrl:undefined})
  };


  sendUrl=async(name,event)=>{
    console.log(this.state.url);
      var url = "http://localhost:3003/short_url";

    let res;
    try {
      res = await axios({
        method: "post",
        url,
        timeout: 30000,
        data: {
          url: this.state.url,
        }
      });
    } catch (error) {
      console.error(error);
      return false;
    }

  this.setState({url:res.data.shortenedUrl, originalUrl:res.data.url});

    if (!res.data || !res.data.success) {
      return false;
    }

  }

  render() {
    const { classes } = this.props;

    return (<div className={classes.container}>

        <form  noValidate autoComplete="off" className={classes.formStyle}>

          <div className={classes.center}>
            <h2>URL Shortener for Zyla</h2>
          </div>
          <div className={classes.center} >
          <TextField
              value={this.state.url}
              id="standard-name"
              label="Enter URL"
              className={classes.textField}
              onChange={this.handleChange('url')}
              margin="normal"
          />
          </div>

          <div className={classes.center}>
          <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{this.sendUrl()}}>
           Short URL
          </Button>
          </div>

          <div className={classes.center}>
          {this.state.url && this.state.originalUrl ? <a  href={"http://"+this.state.originalUrl}>{this.state.url}</a> : null}
          </div>

        </form>
        </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);