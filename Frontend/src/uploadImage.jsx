import { useState } from 'react';
import axios from 'axios';

function UploadImage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Axios automatically parses JSON response, so you can access the data directly
      console.log('Image uploaded:', response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" />}
    </div>
  );
}

export default UploadImage;
