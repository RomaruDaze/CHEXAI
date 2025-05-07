import React, { useState } from "react";
import "./App.css";
import Chatbot from "./components/chatbot/chatbot";
import TodoList from "./components/todo/todo";
import Calendar from "./components/calender/calender";
import { TaskProvider } from "./context/TaskContext";

function App() {
    return (
    <TaskProvider>
      <div className="new-tab">
        <div className="content">
          <div className="content-column-01">
            <div className="space-content-01"><Calendar /></div>
            <div className="space-content-02"><TodoList /></div>
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
    </TaskProvider>
  );
}

export default App;