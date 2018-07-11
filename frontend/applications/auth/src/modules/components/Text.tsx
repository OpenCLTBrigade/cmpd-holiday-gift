import React from 'react';
import { css } from 'react-emotion';

const boldFontWeight = 400;
const alternateFont =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
const primaryFont =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

export enum TextSize {
  XxLarge,
  XLarge,
  Large,
  Medium,
  Default,
  Small,
  XSmall,
  XxSmall
}

const typeScale = {
  [TextSize.XxLarge]: '6rem',
  [TextSize.XLarge]: '5rem',
  [TextSize.Large]: '3rem',
  [TextSize.Medium]: '1.5rem',
  [TextSize.Default]: '1.25rem',
  [TextSize.Small]: '1rem',
  [TextSize.XSmall]: '0.875rem',
  [TextSize.XxSmall]: '0.75rem'
};

type Props = {
  tag?: string;
  size?: TextSize;
  alt?;
  center?;
  caps?;
  bold?;
};

export const Text = ({ tag = 'span', size = TextSize.Default, alt, center, bold, caps, ...props }: Props) => {
  const Tag = tag;
  const style = css({
    fontFamily: alt ? alternateFont : primaryFont,
    fontSize: typeScale[size],
    fontWeight: bold ? boldFontWeight : null,
    textAlign: center ? 'center' : null,
    textTransform: caps ? 'uppercase' : null
  });

  return <Tag {...props} className={style} />;
};

export const Span = props => <Text {...props} tag="span" size={3} />;
