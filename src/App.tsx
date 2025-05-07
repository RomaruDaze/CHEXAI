import "./App.css";
import { useState } from "react";
import Chatbot from "./components/chatbot/chatbot";
import FileManager from "./components/filemanager/filemanager";
import FilePreview from "./components/filepreview/filepreview";

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  url: string;
}

function App() {
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

    return (
      <div className="new-tab">
        <div className="content">
          <div className="content-01">
            <Chatbot />
          </div>
          <div className="content-02">
            <div className="content-02-filemanager">
              <FileManager onFileSelect={setSelectedFile} />
            </div>
            <div className="content-02-preview">
              <FilePreview file={selectedFile} onClose={() => setSelectedFile(null)} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;