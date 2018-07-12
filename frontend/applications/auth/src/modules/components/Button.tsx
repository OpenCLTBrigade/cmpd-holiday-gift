import React from 'react';
import cc from 'classcat';
import styled from '../../../../../../node_modules/react-emotion';

const ButtonStyle = styled('button')({
  cursor: 'pointer',
  padding: '1em',
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  background: '#fff',
  border: 'solid',
  font: '.7em',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
});

type Props = {
  text: string;
  primary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
};

export const Button = ({ text, primary = false, onClick, ...rest }: Props) => (
  <ButtonStyle
    className={cc({
      style: true
    })}
    onClick={onClick}
    {...rest}>
    {text}
  </ButtonStyle>
);
