import React from 'react';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: '',
    };
  }

  fetchParrotsCount() {
    fetch(global.config.apiURL + '/messages/parrots-count')
      .then((response) => {
        return response.json();
      })
      .then((count) => {
        this.setState(state => ({
          counter: count,
        }));
      });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fetchParrotsCount(), global.config.parrotsTimer);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () { return (
    <header className="header">
      <h1 className="header__title">{ global.config.appName }</h1>
      <div className="header__parrots-count">
        <span className="header__title" id="parrots-counter">
              {this.state.counter.toString() || '-'}</span>
      </div>
    </header>
  );
  }
}

export default Header;
