import styled from '../../../../../../node_modules/react-emotion';

type Props = {
  width?: string;
};

export default styled('input')<Props>(
  {
    padding: '1em',
    border: 'solid #eee'
  },
  ({ width = 'full' }) => ({
    width: width && width === 'full' ? '100%' : width + 'em'
  })
);
