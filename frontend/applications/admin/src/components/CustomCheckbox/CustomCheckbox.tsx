import * as React from 'react';

class CustomCheckbox extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      is_checked: props.isChecked ? true : false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ is_checked: !this.state.is_checked });
  }
  render() {
    const { isChecked, number, label, inline, ...rest } = this.props;
    const classes = inline !== undefined ? 'checkbox checkbox-inline' : 'checkbox';
    return (
      <div className={classes}>
        <input id={number} type="checkbox" onChange={this.handleClick} checked={this.state.is_checked} {...rest} />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomCheckbox;
