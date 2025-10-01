"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hello, Next.js!</h1>
      <p>Current count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)} 
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#0070f3",
          color: "white",
          cursor: "pointer"
        }}
      >
        Increment
      </button>
    </main>
  );
}

