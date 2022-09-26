import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
`;

export const TableHead = styled.th`
  padding: 10px 5px;
  text-transform: uppercase;
  text-align: left;
`;

export const TableRow = styled.tr`
  padding: 10px 5px;

  :nth-child(even) {
    background-color: #f1f1f1;
  }
`;

export const TableData = styled.td`
  padding: 10px 5px;

  :nth-child(2),
  :nth-child(3) {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 21px;
  }
`;
