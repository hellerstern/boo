import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { BACKEND_BASE_URL } from "../../config/config";

const ImagePage = () => {

  const iId = useParams().imgId;
  const [data, setData] = useState(null);

  const [loadingFlag, setLoadingFlag] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isNaN(iId)) {
        try {
          setLoadingFlag(true);
          const response = await fetch(`${BACKEND_BASE_URL}/images/${iId}`);
          const data = await response.json();
          console.log(data)
          setData(data);
          setLoadingFlag(false);
        } catch (error) {
          setLoadingFlag(false);
          console.log(error);
        }
      }
    })()
  }, [])

  return (
    <Wrapper>
      {
        data && !loadingFlag ? (
          <>
            {
              !data.ok ? (
                <h1>Server Error</h1>
              ) : data.result.length === 0 ? (
                <h1>We can't find that image</h1>
              ): (
                <>
                  <h1>Image name: {data.result[0].iName}</h1>
                  <img src={data.result[0].base64} style={{width: '50%', marginTop: '30px'}}></img>
                </>
              )
            }
          </>
        ) : isNaN(iId) ? (
          <h1>Invalid URL</h1>
        ): null
      }
      {
        loadingFlag && (
          <LoadingEffect>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </LoadingEffect>
        )
      }

    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #212428;
  min-height: 100vh;
  color: white;
  padding-left: 30px;
  padding-top: 50px;
  h1 {
    margin: 0;
  }
`

 const LoadingEffect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
 `

export default ImagePage;