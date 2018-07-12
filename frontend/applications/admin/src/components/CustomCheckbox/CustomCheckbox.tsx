import * as React from 'react';

class CustomCheckbox extends React.Component<any, any> {
  constructor(props: any) {
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
    const { isChecked, id, label, inline, ...rest } = this.props;
    const classes = inline !== undefined ? 'checkbox checkbox-inline' : 'checkbox';
    return (
      <div className={classes}>
        <input id={id} type="checkbox" onChange={this.handleClick} checked={this.state.is_checked} {...rest} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
}

export default CustomCheckbox;
