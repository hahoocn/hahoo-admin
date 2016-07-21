import React from 'react';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  state = {}

  render() {
    // require('./App.css');
    return (
      <div>
        {this.props.children}
      </div>
		);
  }
}

export default App;
