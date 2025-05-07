import "./App.css";
import Chatbot from "./components/chatbot/chatbot";

function App() {
    return (
      <div className="new-tab">
        <div className="content">
          <div className="content-01">
            <Chatbot />
          </div>
          <div className="content-02">
            <div className="content-02-history"></div>
            <div className="content-02-database"></div>
          </div>
        </div>
      </div>
  );
}

export default App;