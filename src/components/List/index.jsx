import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Accordion, Button, Modal, Table } from 'react-bootstrap';
import moment from 'moment';

import ListItem from '../ListItem';

import './style.css';

function List() {
  const [equityData, setEquityData] = useState([]);
  const [equityHeader, setEquityHeader] = useState([]);
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  useEffect(() => {
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q')
      .then(response => {
        if (typeof response.data['Meta Data'] !== 'undefined') {
            setEquityHeader(response.data['Meta Data']);
            setEquityData(response.data['Time Series (5min)']);
        }
      }).catch(error => {
        console.log(error);
      });
  }, []);

  /*
  useEffect(() => {
    axios.get('https://catfact.ninja/fact')
      .then(response => {
        setEquityData(response.data['fact']);
        console.log('result', equityData);
        console.log('result', response);
      }).catch(error => {
        console.log(error);
      });
      
  }, []);
  */

  return (
    <>
        <div className="av-data">
            <div className="container">
                <div className="row mb-4">
                    <div className="av-data-header">
                        <div className="row">
                            <div className="col-12 col-md-9 mb-3 mb-md-0">
                                <h1>Equity Data from alphavantage.co</h1>
                                {equityHeader['1. Information']}
                            </div>
                            <div className="col-12 col-md-3 text-start text-md-end">
                                <Button variant="primary" onClick={showModal}>Show More Information</Button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Accordion defaultActiveKey="0">
                            {Object.keys(equityData).map((listVal, index) => {
                                let fDate = moment(listVal).format('DD-MMM-YYYY HH:mm:ss');

                                return(
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header><span className="item-counter">{(index + 1) + '.'}</span> {fDate}</Accordion.Header>
                                        <Accordion.Body>
                                            <ListItem key={index} item={equityData[listVal]} idx={index} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })}
                            
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Equity Data Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped="columns" bordered hover size="sm">
                    <tbody>
                        {Object.keys(equityHeader).map((listVal, index) => {
                            let label = listVal.slice( listVal.indexOf('.') + 2 );

                            return(
                                <tr>
                                    <th>{label.charAt(0).toUpperCase() + label.slice(1)}</th>
                                    <td>{equityHeader[listVal]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default List;
