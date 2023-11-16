import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import './app.css'

import Router from "./router/Router";
import { Alert } from "react-bootstrap";


function App() {
  return (
    <BrowserRouter>

      <Router />

      <Alert id="fail" variant="danger" className="m-2 float" hidden={true} dismissible>
        <p>message</p>
      </Alert>
      <Alert id="success" variant="success" className="m-2 float" hidden={true} dismissible>
        <p>message</p>
      </Alert>
    </BrowserRouter>
  );
}

export default App;

// -----------------------------------------------