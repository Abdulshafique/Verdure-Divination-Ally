import React, { useState } from 'react';
import { Container, Form, Button, Alert, Image } from 'react-bootstrap';
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select an image to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);  // Ensure the key is 'image' to match Flask
  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setMessage('Image uploaded successfully!');
        setResult(data.predicted_class);
      } else {
        const errorData = await response.json();
        setMessage(`Error uploading image: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error uploading image: ${error.message}`);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMessage(''); // Clear message when a new file is selected
    setResult('');  // Clear result when a new file is selected
  };

  return (
    <Container className="upload-container">
      <h2>Upload Plant Image</h2>
      {message && <Alert variant="info">{message}</Alert>}
      {result && <Alert variant="success">Prediction: {result}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="custom-file-upload">
            <input
              type="file"
              onChange={handleFileChange}
            />
            {file ? file.name : 'Choose Image'}
          </Form.Label>
        </Form.Group>
        {preview && (
          <div className="image-preview">
            <Image src={preview} alt="Preview" fluid />
          </div>
        )}
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </Container>
  );
}

export default Upload;
