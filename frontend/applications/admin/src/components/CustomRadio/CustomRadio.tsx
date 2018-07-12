import * as React from 'react';

class CustomRadio extends React.Component<any, any> {
  render() {
    const { id, label, option, name, ...rest } = this.props;

    return (
      <div className="radio">
        <input id={id} name={name} type="radio" value={option} {...rest} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
}

export default CustomRadio;
