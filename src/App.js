import logo from './logo.svg';
import './App.css';
import React, { useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const videoRef = useRef(null);

  const WindowContents = () => {
    return (
      <div className="App">
        <h2>Puppy's day out 🐶</h2>
        <video ref={videoRef} controls id="pip-object" height={"400"}>
          <source src="/puppy.mp4" />{" "}
        </video>
        <button onClick={() => window.documentPictureInPicture.window.close()}>
          Close
        </button>
      </div>
    );
  };

  const openWindow = async () => {
    try {
      const dpip = await window.documentPictureInPicture.requestWindow({
        width: "500",
        height: "500",
      });

      const pipDiv = dpip.document.createElement("div");
      pipDiv.setAttribute("id", "pip-root");
      dpip.document.body.append(pipDiv);
      const pipRoot = ReactDOM.createRoot(
        dpip.document.getElementById("pip-root")
      );
      pipRoot.render(<WindowContents />);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="App-btn-container">
      <button
        className="App-btn"
        onClick={openWindow}
      >
        Open Document PIP
      </button>

    </div>
  );
}

export default App;
