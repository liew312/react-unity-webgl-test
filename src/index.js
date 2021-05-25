// import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { TestFuncComponent } from "./test-func-component";
// import { TestClassComponent } from "./test-class-component";

// class App extends Component {
//   render() {
//     return <TestFuncComponent />;
//     // return <TestClassComponent />;
//   }
// }

import React, { useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});
window.u = unityContext;

function spawnEnemies(amount) {
  unityContext.send("GameController", "SpawnEnemies", amount);
}

const App = () => {
  const [show, setShow] = useState(false);
  const [progression, setProgression] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setstate] = useState(false);
  unityContext.on("Say", (message) => {
    console.log({ message });
    setstate((prevstate) => !prevstate);
    handleShow();
  });

  unityContext.on("progress", (progression) => {
    setProgression(progression);
  });

  return (
    <div>
      <p>{`Loading... ${progression * 100}%`}</p>
      <Button variant="primary">Primary</Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {state ? <h1>True</h1> : <h1>False</h1>}
      <button onClick={() => spawnEnemies(100)}>Spawn!</button>
      <Unity
        unityContext={unityContext}
        style={{
          width: 1920,
          height: 1080,
          border: "2px solid black",
          background: "grey",
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
