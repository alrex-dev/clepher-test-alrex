import { Table } from 'react-bootstrap';

import './style.css';

interface listItemProps {
    item: any,
    idx: number
};

function ListItem({item, idx}: listItemProps) {
  return (
    <Table striped="columns" bordered hover size="sm">
        <tbody>
            {Object.keys(item).map((listVal: string, index: number) => {
                let label = listVal.slice( listVal.indexOf('.') + 2 );

                return(
                    <tr key={index}>
                        <th className="label-col">{label.charAt(0).toUpperCase() + label.slice(1)}</th>
                        <td>{item[listVal]}</td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
  );
}

export default ListItem;
