import { Table } from 'react-bootstrap';

import './style.css';

function ListItem({item, idx}) {
  return (
    <Table striped="columns" bordered hover size="sm">
        <tbody>
            {Object.keys(item).map((listVal, index) => {
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
