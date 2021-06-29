import React from 'react';
import './ChatArea.css';
import Post from '../Post/Post';

class ChatArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  async listMessages() {
    await fetch(global.config.apiURL + '/messages')
      .then(function (response) {
        return response.json();
      })
      .then((msgs) => {
        this.setState(state => ({
          messages: msgs,
        }));
      });
  }

  scrollToBottom() {
    this.chatRef.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.listMessages(), global.config.listTimer);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () { return (
      <main className="chat">
        {Array.apply(null, this.state.messages.slice(-global.config.showLast).map((post)=> {
              return (
                <Post
                key={post.id}
                id={post.id}
                name={post.author.name}
                avatar={post.author.avatar}
                date={post.created_at}
                content={post.content}
                hasParrot={post.has_parrot} />
              );
            })
      )}
        <div ref={chatRef => { this.chatRef = chatRef;}}>
          
        </div>

      </main>
    );
  }
}

export default ChatArea;
