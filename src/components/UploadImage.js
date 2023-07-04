import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function UploadImage() {

  const uploadRef = useRef(null);

  const [base64Image, setBase64Image] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const uploadToServer = async () => {
    if (base64Image === null) {
      alert('Upload new image!');
      return
    }
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64Image })
      };
  
      try {
        const response = await fetch('http://174.138.188.39:80/getImg/', requestOptions);
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
    <Wrapper>

      <UploadDiv onClick={() => {
        uploadRef.current.click();
      }}>
        <AiOutlineCloudUpload />
        <p>Upload new image</p>
      </UploadDiv>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} ref={uploadRef} style={{display: 'none'}}/>
        <Button onClick={uploadToServer}>Upload Img</Button>
  
      </div>
      <img src={base64Image} alt='img' width={400} style={{marginTop: '30px'}}></img>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  
`

const UploadDiv = styled.div`
  border-radius: 25px;
  border: 3px dashed #68676E;
  background: rgba(196, 196, 196, 0.00);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 50px;

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  cursor: pointer;
  svg {
    font-size: 40px;
  }
`

const Button = styled.button`
  border-radius: 20px;
  background: #FF343F;
  color: white;
  border: 0;
  outline: 0;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 10px 14px;
  margin: 30px 0;
`

export default UploadImage;
