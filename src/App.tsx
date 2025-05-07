import React, { useState } from "react";
import "./App.css";
import Chatbot from "./components/chatbot/chatbot";
function App() {
    return (
    <div className="new-tab">
      <div className="content">
        <div className="content-column-01">
          <div className="space-content-01"><Chatbot /></div>
          <div className="space-content-02"><Chatbot /></div>
        </div>
        <div className="content-column-02">
          <div className="space-content-01"><Chatbot /></div>
          <div className="space-content-02"><Chatbot /></div>
        </div>
        <div className="content-column-03">
          <div className="space-content-01"><Chatbot /></div>
          <div className="space-content-02"><Chatbot /></div>
        </div>
      </div>
    </div>
  );
}

export default App;