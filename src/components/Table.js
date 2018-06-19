import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  overflow-x: scroll;
`;

const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
`;

const TableHeadColumn = styled.th`
text-align: left;
padding: 0.5rem;
`;

export const TableRow = styled.tr`
  border-bottom: 2px solid #dcdcdc;
`;

export const TableData = styled.td`
  padding: 0.5rem;
`;

export default ({ headers = [], children }) =>
  <TableWrapper>
    <Table>
      <thead>
        <TableRow>
          {
            headers.map((header, index) =>
              <TableHeadColumn key={index}>{header}</TableHeadColumn>
            )
          }
        </TableRow>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  </TableWrapper>;
