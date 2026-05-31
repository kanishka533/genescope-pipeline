
















































































































































































































































































































































































































































































import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import React, { useState } from "react";
import axios from "axios";
import { FaDna, FaUpload } from "react-icons/fa";
import "./App.css";

function App() {

  const [file, setFile] = useState(null);

  const [results, setResults] = useState({
    reads: 0,
    gc_content: 0,
    quality_score: 0,
    mutations: 0
  });

  const uploadFile = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

    setResults({
  reads: response.data.reads,
  gc_content: response.data.gc_content,
  quality_score: response.data.quality_score,
  mutations: response.data.mutations
});

      alert("Uploaded: " + response.data.filename);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const chartData = [
    {
      name: "Reads",
      value: results.reads
    },
    {
      name: "GC %",
      value: results.gc_content
    },
    {
      name: "Quality",
      value: results.quality_score
    },
    {
      name: "Mutations",
      value: results.mutations
    }
  ];

  return (
    <div className="App">

      <div className="dna-bg dna1">
        <FaDna />
      </div>

      <div className="dna-bg dna2">
        <FaDna />
      </div>

      <div className="dna-bg dna3">
        <FaDna />
      </div>

      <nav className="navbar">

        <div className="logo">
          🧬 GeneScope
        </div>

        <div className="menu">
          <span>Dashboard</span>
          <span>Analysis</span>
          <span>Reports</span>
          <span>About</span>
        </div>

      </nav>

      <div className="hero">

        <FaDna size={80} />

        <h1>GeneScope Pipeline</h1>

        <h3 className="tagline">
          Advanced Genomic Intelligence Platform
        </h3>

        <p>
          Upload • Analyze • Visualize • Discover
        </p>

        <div className="hero-buttons">

          <button className="hero-btn">
            Start Analysis
          </button>

          <button className="hero-btn secondary">
            View Dashboard
          </button>

        </div>

      </div>

      <div className="stats-container">

        <div className="card reads">
          <h3>Total Reads</h3>
          <h2>{results.reads}</h2>
        </div>

        <div className="card gc">
          <h3>GC Content</h3>
          <h2>{results.gc_content}%</h2>
        </div>

        <div className="card quality">
          <h3>Quality Score</h3>
          <h2>{results.quality_score}</h2>
        </div>

        <div className="card mutation">
          <h3>Mutations</h3>
          <h2>{results.mutations}</h2>
        </div>

      </div>

            <div className="upload-box">

        <h2>
          <FaUpload /> Upload FASTQ File
        </h2>

        <br />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br /><br />

        <button onClick={uploadFile}>
          Analyze Genome
        </button>

      </div>

      <div
        className="upload-box"
        style={{ marginTop: "30px" }}
      >

        <h2>Analysis Visualization</h2>

        <BarChart
          width={700}
          height={300}
          data={chartData}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>

      </div>

    </div>
  );
}


export default App;