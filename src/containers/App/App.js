import React from 'react';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
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
