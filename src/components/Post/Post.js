import React from 'react';
import './Post.css';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.id = '';
    this.name = '';
    this.avatar = '';
    this.date = '';
    this.content = '';
    this.hasParrot = false;
  }

  formatDate(date) {
    let d = new Date(date);

    return (
      d.getHours() + ':' + ('0' + d.getMinutes()).substr(-2)
    );
  }

  parrotMessage(msgId, isParroted) {
    if (!isParroted) {
      fetch(global.config.apiURL + '/messages/' + msgId + '/parrot', { method: 'PUT' });
      this.postDiv.classList.add('parroted-post');
      this.parrotDiv.classList.add('parrot-color');
    } else {
      fetch(global.config.apiURL + '/messages/' + msgId + '/unparrot', { method: 'PUT' });
      this.postDiv.classList.remove('parroted-post');
      this.parrotDiv.classList.remove('parrot-color');
    }
  }

  render () { return (
      <div className={this.props.hasParrot ? 'post parroted-post' : 'post'}
           id={this.props.id}
           ref={(div) => { this.postDiv = div; }}
           >
        <img src={this.props.avatar} width="34" height="34"
            alt="poster avatar" className="post__pic" />
        <div className="post__msg">
          <div className="post__msg__header">
            <span className="username">{this.props.name}</span>
            <span className="separator"></span>
          <span className="time">{this.formatDate(this.props.date)}</span>
            <span className="separator"></span>
            <div
              onClick={ () => this.parrotMessage(this.props.id, this.props.hasParrot) }
              className={this.props.hasParrot ? 'parrot parrot-color' : 'parrot'}
              ref={(div) => { this.parrotDiv = div; }}
              ></div>
          </div>
          <div className="post__msg__text">
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
