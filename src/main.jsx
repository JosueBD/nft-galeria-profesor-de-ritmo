import React from "react";
import ReactDOM from "react-dom/client";
import NFTGaleria from "./NFTGaleria";
import "@solana/wallet-adapter-react-ui/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NFTGaleria />
  </React.StrictMode>
);