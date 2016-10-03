import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

function makeOptions(options, i) {
  let items = [];
  let deep = i;
  let prefix = '|-';
  for (let j = 0; j < deep; j++) {
    prefix = `\u3000${prefix}`;
  }
  for (const option of options) {
    items.push(<option key={option.id} value={option.id}>{prefix}{option.title}</option>);
    if (option.subItems && option.subItems.length > 0) {
      deep++;
      items = items.concat(makeOptions(option.subItems, deep));
      deep--;
    }
  }
  return items;
}

class CateSelect extends React.Component {
  static propTypes = {
    options: React.PropTypes.array,
    preOptions: React.PropTypes.array,
    lastOptions: React.PropTypes.array,
    isShowFirstInfo: React.PropTypes.bool
  }

  static defaultProps = {
    options: [],
    preOptions: [],
    lastOptions: [],
    isShowFirstInfo: true
  }

  render() {
    const { options, preOptions, lastOptions, isShowFirstInfo, ...rest } = this.props;
    delete rest.componentClass;
    let items = [];
    if (isShowFirstInfo) {
      items.push(<option key={-1} value="">---请选择---</option>);
    }
    if (preOptions && preOptions.length > 0) {
      items = items.concat(makeOptions(preOptions, 0));
    }

    items = items.concat(makeOptions(options, 0));

    if (lastOptions && lastOptions.length > 0) {
      items = items.concat(makeOptions(lastOptions, 0));
    }

    return (
      <FormControl
        componentClass="select"
        style={{ textAlign: 'left' }}
        {...rest}
      >
        {items}
      </FormControl>
    );
  }
}

export default CateSelect;
