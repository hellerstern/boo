import React, { useState } from 'react';

function App() {

  const [base64Image, setBase64Image] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const uploadToServer = async () => {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64Image })
      };
  
      try {
        const response = await fetch('http://localhost:443/getImg/', requestOptions);
        const data = await response.json();
        
        if (data.ok) {
          alert('Uploaded!');
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }
  
  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={uploadToServer}>Upload Img</button>
  
      </div>
      <img src={base64Image} alt='img' width={400} style={{marginTop: '30px'}}></img>
    </div>
  );
}

export default App;