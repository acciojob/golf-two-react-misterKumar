import React, { useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [renderBall, setRenderBall] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ballPosition, setBallPosition] = useState({
    left: "0px",
    top: "0px",
  });

  const reset = () => {
    setRenderBall(false);
    setX(0);
    setY(0);
    setBallPosition({
      left: "0px",
      top: "0px",
    });
  };

  const handleArrowKeys = (event) => {
    let updatedX = x;
    let updatedY = y;

    switch (event.key) {
      case "ArrowRight":
        updatedX += 5;
        break;
      case "ArrowLeft":
        updatedX -= 5;
        break;
      case "ArrowUp":
        updatedY -= 5;
        break;
      case "ArrowDown":
        updatedY += 5;
        break;
      default:
        break;
    }

    setX(updatedX);
    setY(updatedY);

    // Set the ball position after a small delay
    setTimeout(() => {
      setBallPosition({
        left: `${updatedX}px`,
        top: `${updatedY}px`,
      });
    }, 4000);
  };

  useEffect(() => {
    if (renderBall) {
      window.addEventListener("keydown", handleArrowKeys);
    } else {
      window.removeEventListener("keydown", handleArrowKeys);
    }

    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, [renderBall, x, y]);

  const renderChoice = () => {
    if (renderBall) {
      return <div className="ball" style={ballPosition}></div>;
    } else {
      return (
        <button onClick={() => setRenderBall(true)} className="start">
          Start
        </button>
      );
    }
  };

  return (
    <div className="playground">
      <button onClick={reset} className="reset">
        Reset
      </button>
      {renderChoice()}
    </div>
  );
};

export default App;
