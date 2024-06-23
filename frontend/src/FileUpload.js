import React, { useState } from "react";
import axios from "axios";
import config from "./config";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  //Handles file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
    setUploadProgress(0);
  };

  //Handles file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    //'csvfile' will allow multer to handle the file from server side
    formData.append("csvfile", selectedFile);

    setLoading(true);

    try {
      const response = await axios.post(
        `${config.SERVER_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          //Enables to create downloadable link for the returned zip file
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      //Creates an url for downloading returned zip file
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

      //Creating the link for downloading
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "result.zip");
      document.body.appendChild(link);
      link.click();

      //Cleans the document
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setLoading(false);
    } catch (error) {
      console.error("Error uploading file: ", error);
      setError("Error uploading file.");
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload File"}
      </button>
      {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
