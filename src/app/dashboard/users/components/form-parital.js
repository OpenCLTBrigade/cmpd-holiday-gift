// @flow
import React from 'react';
import { getAffiliationList } from 'api/affiliation';
import SelectList from './select-list';

export default class SelectOptions extends React.Component {

  async fetch(
    page: number,
    search: string = ''
  ): Promise<{ items: AffiliationType[] }> {
    let response: Object = await getAffiliationList(page, search);
    return { items: response.items };
  }

  render(): React.Element<any> {

    return (
      <SelectList fetch={this.fetch} />
    );
  }
}
