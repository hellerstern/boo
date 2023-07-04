import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import UploadImage from '../../components/UploadImage';
import ImagesList from '../../components/ImagesList';

const HomePage = () => {

  const [base64Image, setBase64Image] = useState(null);

  const [savedFileName, setSavedFileName] = useState('');

  const handleDownload = () => {

    if (!base64Image) {
      alert('Snapshot new image');
      return 
    }
    else if (savedFileName.trim() === '') {
      alert('Enter new image name!');
      return
    }
    fetch(base64Image)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = savedFileName;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const webcamRef = useRef(null);

  const captureScreen = async () => {
    const canvas = await html2canvas(document.getElementsByTagName('video')[0]);
    const imageDataUrl = canvas.toDataURL('image/png');
    setBase64Image(imageDataUrl);
  };


  return (
    <Wrapper>
      <div className='buttons'>
        <Button onClick={captureScreen}> Capture Screen </Button>
        <Button onClick={handleDownload}> Save on your local </Button>

        <Input placeholder='Enter new image name' value={savedFileName} onChange={(e) => setSavedFileName(e.target.value)}></Input>
      </div>
      {base64Image ? (
        <SnapshotedImg src={base64Image} alt="Screen Camera" />
      ) : (
        <Webcam ref={webcamRef} />
      )}

      <Box>
        <UploadImage />
        <ImagesList />
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #212428;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 40px;
  .buttons {
    display: flex;
    gap: 30px;
    margin: 40px;
  }

  video {
    width: 500px;
    height: 300px;
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
`

const SnapshotedImg = styled.img`
  border-radius: 12px;
  background: rgba(196, 196, 196, 0.00);
  width: 300px;
`

const Input = styled.input`
  &::placeholder {
    color: #68676E;
  }

  color: white;
  font-size: 14px;
  font-weight: 300;
  
  border-radius: 8px;
  border: 0.5px solid #EEE;
  background: rgba(196, 196, 196, 0.00);
  padding: 5px 10px;
` 

const Box = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`

export default HomePage;