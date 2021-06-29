import React from 'react';
import './MsgBox.css';
import spinner from '../../assets/images/spinner.gif';
import send from '../../assets/images/send_icon.svg';

class MsgBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      avatar: '',
      sending: false,
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  getMe() {
    fetch(global.config.apiURL + '/me')
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        this.setState(state => ({
          userId: user.id,
          userName: user.name,
          avatar: user.avatar,
        }));
      });
  }

  async sendMessage() {
    const message = this.msgText.value;
    let resStatus;

    if (message !== '') {

      this.msgText.blur();

      this.setState(state => ({ sending: true }));

      await fetch(global.config.apiURL + '/messages/', {
          method: 'POST',
          body: JSON.stringify({
            message: message,
            author_id: this.state.userId,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(res => {
          resStatus = res.status;
          return res.json();
        })
    .then(res => {
        switch (resStatus) {
        case 200:
          this.msgText.value = '';
          this.msgText.focus();
          break;
        case 400:
          if (res.code === 'ValidationFailed') {
            console.log(res.fieldMessages);
            console.log('This is a BAD Request Error!');
          } else {
            console.log('Oh no! An invalid JSON!');
          }

          break;
        case 500:
          this.tagAlert('Server error, please try again!');
          console.log('Server error, try again!');
          this.msgText.blur();
          break;
        default:
          break;
      }
      })
    .catch(err => {
        console.error(err);
      });
      this.setState(state => ({ sending: false }));
    }
  }

  tagAlert(msg) {
    this.alertDiv.classList.add('alert__show');
    this.alertMsg.innerHTML = msg;

    this.alertBtn.addEventListener('click', () => {
      this.alertDiv.classList.remove('alert__show');
      this.msgText.focus();
    });

  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  componentDidMount() {
    this.getMe();
  }

  render () { return (
    <>
    <div className="msgbox">
    <img className="msgbox__mypic" src={this.state.avatar || spinner} width="52" height="52" alt="A spinner" />
    <input className="msgbox__text"
           type="text"
           onKeyUp={this.onKeyUp.bind(this)}
           ref={(input) => { this.msgText = input; }}
           autoFocus />
    <img className="msgbox__send"
         src={this.state.sending ? spinner : send}
         alt=""
         onClick={this.sendMessage}/>
    </div>

    <div className="alert"
         ref={(div) => { this.alertDiv = div; }}
      >
      <div className="alert__box">
        <div className="alert__title">
          { global.config.appName }
        </div>
        <div className="alert__message"
             ref={(message) => { this.alertMsg = message; }}
        >
        </div>
        <div className="alert__btn"
             ref={(button) => { this.alertBtn = button; }}
        >
          OK
        </div>
      </div>
   </div>
   </>
    );
  }
}

export default MsgBox;
