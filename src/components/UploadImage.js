import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BACKEND_BASE_URL } from '../config/config';
import { AppContext } from '../context';

function UploadImage() {

  const AppData = useContext(AppContext);
  const [apiKey, setApikey] = useState('');
  const [loadingFlag, setLoadingFlag] = useState(false);

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
        setLoadingFlag(true);
        const response = await fetch(`${BACKEND_BASE_URL}/getImg`, requestOptions);
        const data = await response.json();
        if (data.ok) {
          if (data.result.flag === 0) {
            alert('Customer Found');
          } else {
            alert('New Customer Added')
            AppData.setNewImgFlag(!AppData.newImgFlag);
            setApikey(data.result.apikey);
          }
        }
        setLoadingFlag(false);
      } catch (error) {
        setLoadingFlag(false);
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

        {
          !loadingFlag && (
            <Button onClick={uploadToServer}>Upload Img</Button>
          )
        }
        
      </div>

      {
        loadingFlag && (
          <LoadingContainer>
            <div className="lds-ripple"><div></div><div></div></div>
          </LoadingContainer>
        )
      }
      {
        apiKey !== '' && (
          <h2 style={{color: 'white'}}>API-KEY: {apiKey}</h2>
        )
      }
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

  position: relative;
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

const LoadingContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }

`
export default UploadImage;