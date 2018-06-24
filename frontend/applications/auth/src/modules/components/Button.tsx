import React from 'react';
import cc from 'classcat';
import picostyle from 'picostyle';
import { css } from 'emotion';

const style = css({
  ':not(:first-of-type)': {
    marginLeft: '5px'
  }
});

type Props = {
  text: string;
  primary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
};

export const Button = ({ text, primary = false, onClick, ...rest }: Props) => (
  <button
    className={cc({
      style: true,
      btn: true,
      primary: primary
    })}
    onClick={onClick}
    {...rest}>
    {text}
  </button>
);
