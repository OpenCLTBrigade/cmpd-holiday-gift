import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from '../../components/CustomButton/CustomButton';
import Checkbox from '../../components/CustomCheckbox/CustomCheckbox';

export class Tasks extends React.Component<any, any> {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    const tasksTitle = [
      'Sign contract for "What are conference organizers afraid of?"',
      'Lines From Great Russian Literature? Or E-mails From My Boss?',
      'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroi',
      'Create 4 Invisible User Experiences you Never Knew About',
      'Read "Following makes Medium better"',
      'Unfollow 5 enemies from twitter'
    ];
    var tasks = [];
    var number;
    for (var i = 0; i < tasksTitle.length; i++) {
      number = 'checkbox' + i;
      tasks.push(
        <tr key={i}>
          <td>
            <Checkbox number={number} isChecked={i === 1 || i === 2 ? true : false} />
          </td>
          <td>{tasksTitle[i]}</td>
          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button bsStyle="info" simple type="button" bsSize="xs">
                <i className="fa fa-edit" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="xs">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default Tasks;
