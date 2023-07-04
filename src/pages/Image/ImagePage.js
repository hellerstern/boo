import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ImagePage = () => {

  const iId = useParams().imgId;
  const [data, setData] = useState(null);


  useEffect(() => {
    (async () => {
      if (!isNaN(iId)) {
        try {
          const response = await fetch(`http://localhost:443/images/${iId}`);
          const data = await response.json();
          console.log(data)
          setData(data);
        } catch (error) {
          console.log(error);
        }
      }
    })()
  }, [])

  return (
    <Wrapper>
      {
        data ? (
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

export default ImagePage;