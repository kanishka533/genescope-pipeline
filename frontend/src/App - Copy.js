import React, { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:5000/upload",
      formData
    );

    alert(
      "Uploaded: " +
      response.data.filename
    );
  };

  return (
    <div>

      <h1>GeneScope Pipeline</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br /><br />

      <button onClick={uploadFile}>
        Upload FASTQ
      </button>

    </div>
  );
}

export default App;