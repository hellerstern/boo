import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BACKEND_BASE_URL } from '../config/config';
import { AppContext } from '../context';

function UploadImage() {

  const AppData = useContext(AppContext);

  const uploadRef = useRef(null);

  const [base64Image, setBase64Image] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const uploadToServer = async () => {
    if (base64Image === null) {
      alert('Please Upload new image');
      return
    }
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          file: base64Image,
          fileName
        })
      };

      console.log(base64Image)
  
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/getImg`, requestOptions);
        const data = await response.json();
        if (data.ok) {

          AppData.setNewImgFlag(!AppData.newImgFlag);
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
      {
        base64Image && (
          <img src={base64Image} alt='img' width={400} style={{marginTop: '30px'}}></img>
        )
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  padding-bottom: 100px;
  width: 45%;
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
