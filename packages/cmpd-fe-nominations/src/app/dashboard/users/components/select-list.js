import * as React from 'react';
import FormField from '../../../../app/components/form/FormField';

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
    this.props.fetchAll().then(data => {
      this.setState({ items: data });
    });
  }

  render() {
    return (
      <FormField label="Affilation" name={'user.affiliationId'} componentClass="select" required>
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
      </FormField>
    );
  }
}
