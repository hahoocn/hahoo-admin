import React from 'react';
import Label from 'react-bootstrap/lib/Label';

class LabelUnPublish extends React.Component {
  state = {}

  render() {
    return (
      <Label bsStyle="danger">未发布</Label>
		);
  }
}

export default LabelUnPublish;
