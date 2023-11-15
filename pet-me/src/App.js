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

      <Alert id="fail-auth" variant="danger" className="m-2" hidden={true} dismissible></Alert>
      
    </BrowserRouter>
  );
}

export default App;
