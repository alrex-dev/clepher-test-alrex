import axios from 'axios';
import {useState, useEffect} from 'react';
import { Accordion, Button, Modal, Table, Spinner } from 'react-bootstrap';
import moment from 'moment';

import ListItem from '../ListItem/index.tsx';

import './style.css';

function List() {
  const [equityData, setEquityData] = useState<any>([]);
  const [equityHeader, setEquityHeader] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [spinnerClass, setSpinnerClass] = useState<string>('');

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  useEffect(() => {
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q')
      .then(response => {
        if (typeof response.data['Meta Data'] !== 'undefined') {
            setEquityHeader(response.data['Meta Data']);
            setEquityData(response.data['Time Series (5min)']);
            setSpinnerClass(' visually-hidden');
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
                        <div className={'row text-center mt-4 hide' + spinnerClass}>
                            <Spinner animation="border" role="status" className="mx-auto">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Accordion defaultActiveKey="0">
                            {Object.keys(equityData).map((listVal: string, index: number) => {
                                let fDate = moment(listVal).format('DD-MMM-YYYY HH:mm:ss');
                                let eKey: string = index.toString();

                                return(
                                    <Accordion.Item eventKey={eKey}>
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
