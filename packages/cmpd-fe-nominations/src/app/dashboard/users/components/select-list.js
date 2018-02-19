import * as React from 'react';
import Input from '../../../../app/components/input';
import requiredValidator from '../../../../lib/validators/required.validator';

// type Item = {
//   id: number,
//   type: string,
//   name: string
// };

// export type SelectListItem = Item;

export default class SelectList extends React.Component {
  // state: { items: Item[] };

  // props: {
  //   fetchAll: () => Promise<Item[]> };

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    //console.log('fetchData');
    this.props.fetchAll().then(data => {
      //console.log('In Fetch:', data);
      this.setState({ items: data });
    });
  }

  render() {
    return (
      <Input label="Affilation" name={'user.affiliationId'} componentClass="select" validator={requiredValidator}>
        <option />
        {this.state.items.length === 0 ? (
          <option disabled>Loading...</option>
        ) : (
          this.state.items.map(item => (
            <option key={item.id} value={item.id}>
              {item.type.toUpperCase()} - {item.name}
            </option>
          ))
        )}
      </Input>
    );
  }
}
