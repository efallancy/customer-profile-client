import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table, { TableRow, TableData } from '../Table';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {
  it('should render table with correct table header and its children', () => {
    const tableHeader = ['ID', 'Name'];

    const table = mount(
      <Table headers={tableHeader}>
        <TableRow>
          <TableData>1</TableData>
          <TableData>Number One</TableData>
        </TableRow>
      </Table>
    );

    expect(table.find('th').length).toBe(tableHeader.length);
    expect(table.find('tbody tr')).toHaveLength(1);
    expect(table.find('tbody tr td')).toHaveLength(2);
  });
});
