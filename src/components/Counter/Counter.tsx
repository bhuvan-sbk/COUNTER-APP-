import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Counter.css";  
const Counter: React.FC = () => {
  const [count, setCount] = useState(() => {
    try {
      const savedCount = localStorage.getItem("count");
      console.log("Loaded count from localStorage:", savedCount); // Debugging
      return savedCount ? parseInt(savedCount) : 0;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return 0;
    }
  });

  useEffect(() => {
    console.log("Count updated:", count); // Debugging
    try {
      localStorage.setItem("count", count.toString());
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [count]);

  // Spring animation for background height
  const backgroundProps = useSpring({
    height: `${Math.abs(count)}%`, // Use absolute value for height
    config: {
      tension: 120,
      friction: 14,
    },
  });

  // Spring animation for counter text
  const textProps = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 300 },
  });

  return (
    <div className="counter-container">
      {/* Animated background */}
      <animated.div
        style={{
          ...backgroundProps,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            count > 0
              ? "linear-gradient(45deg, #4caf50, #81c784)" // Green gradient for positive
              : count < 0
              ? "linear-gradient(45deg, #f44336, #e57373)" // Red gradient for negative
              : "linear-gradient(45deg, #6a11cb, #2575fc)", // Default gradient for zero
          zIndex: -1,
        }}
      />

      <animated.div
        style={{
          ...textProps,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h1 className="counter-title">Count: {count}</h1>
        <div className="button-container">
          <button
            onClick={() => {
              setCount((c) => c + 1);
              console.log("Increment button clicked"); // Debugging
            }}
            className="counter-button increment"
          >
            Increment +
          </button>
          <button
            onClick={() => {
              setCount((c) => c - 1);
              console.log("Decrement button clicked"); // Debugging
            }}
            className="counter-button decrement"
          >
            Decrement -
          </button>
          <button
            onClick={() => {
              setCount(0);
              console.log("Reset button clicked"); // Debugging
            }}
            className="counter-button reset"
          >
            Reset
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default Counter;
