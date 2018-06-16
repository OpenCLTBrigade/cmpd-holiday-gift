import * as React from 'react';

class CustomRadio extends React.Component<any, any> {
  render() {
    const { number, label, option, name, ...rest } = this.props;

    return (
      <div className="radio">
        <input id={number} name={name} type="radio" value={option} {...rest} />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomRadio;
