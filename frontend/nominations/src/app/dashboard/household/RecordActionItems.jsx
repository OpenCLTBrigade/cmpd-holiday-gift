import * as React from 'react';
import InlineConfirmButton from 'react-inline-confirm';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-right: 5px;
`;

const StyledInlineConfirmButton = styled(InlineConfirmButton)`
  font-size: 12px;
`;
class RecordActionItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDeleting: false };
  }

  render() {
    const { isDeleting } = this.state;
    const deleteTextValues = ['Delete', 'Click again to delete', 'Deleting...'];
    const deleteConfirmIconClass = `fa fa-${
      isDeleting ? 'circle-o-notch fa-spin' : ' '
    }`;
    const { householdId } = this.props;

    return (
      <div>
        <Link to={`/dashboard/household/show/${householdId}`}>
          <StyledButton className="btn btn-sm btn-primary">Show</StyledButton>
        </Link>
        <Link to={`/dashboard/household/edit/${householdId}`}>
          <StyledButton className="btn btn-sm btn-info">Edit</StyledButton>
        </Link>
        <StyledInlineConfirmButton
          className="btn btn-default"
          textValues={deleteTextValues}
          showTimer
          isExecuting={isDeleting}
          onClick={() => this.props.handleDelete(this.props.householdId)}>
          <i className={deleteConfirmIconClass} />
        </StyledInlineConfirmButton>
      </div>
    );
  }
}

export default RecordActionItems;
