import React, {useState} from 'react';
import logo from './logo.svg';
import Icon from './components/Icon';
// using toastify code here
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Card, CardBody, Container, Button, Col, Row} from 'reactstrap';
// Always import .css file after bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// storing all nine icons values in array
const itemArray = new Array(9).fill("empty");


// Main Component
const App = () => {

  // using react state for cross and winning msg
  const [isCross, setIsCross] = useState(false)
  const [winMessage, setWinMessage] = useState("")


  // defining methods for following
  const reloadGame = () => {
    setIsCross(false)
    setWinMessage("")
    itemArray.fill("empty", 0 , 9);
  }

  const checkIsWinner = () => {
    if (itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
      ) {
        setWinMessage(`${itemArray[0]} wons`);
      } else if (
        itemArray[3] !== "empty" &&
        itemArray[3] === itemArray[4] &&
        itemArray[4] === itemArray[5]
      ) {
        setWinMessage(`${itemArray[3]} won`);
      } else if (
        itemArray[6] !== "empty" &&
        itemArray[6] === itemArray[7] &&
        itemArray[7] === itemArray[8]
      ){
        setWinMessage(`${itemArray[6]} won`);
      } else if (
        itemArray[0] !== "empty" &&
        itemArray[0] === itemArray[3] &&
        itemArray[3] === itemArray[6]
      ){
        setWinMessage(`${itemArray[0]} won`);
      } else if (
        itemArray[1] !== "empty" &&
        itemArray[1] === itemArray[4] &&
        itemArray[4] === itemArray[7]
      ){
        setWinMessage(`${itemArray[1]} won`);
      } else if (
        itemArray[2] !== "empty" &&
        itemArray[2] === itemArray[5] &&
        itemArray[5] === itemArray[8]
      ){
        setWinMessage(`${itemArray[2]} won`);
      } else if (
        itemArray[2] !== "empty" &&
        itemArray[2] === itemArray[4] &&
        itemArray[4] === itemArray[6]
      ){
        setWinMessage(`${itemArray[2]} won`);
      } else if (
        itemArray[0] !== "empty" &&
        itemArray[0] === itemArray[4] &&
        itemArray[4] === itemArray[8]
      ){
        setWinMessage(`${itemArray[0]} won`);
      }
  }

  // to check when we click on button that shud change or not
  const changeItem = itemNumber => {
    if (winMessage){
      return toast(winMessage, {type: "success"})
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle"
      setIsCross(!isCross)
    } else{
      return toast("already filled", {type:"error"})
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center"/>
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-primary text-uppercase text-center">
                {winMessage}
              </h1>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          ) }
          <div className="grid">
            {itemArray.map((item,index) => (
              <Card color="warning" onClick={ () => changeItem(index) }>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
          <br />
          <Button 
          color="success"
          block
          onClick={reloadGame}>
          Reload The Game
        </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
