import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";

import { BACKEND_BASE_URL } from "../../config/config";

const LoginPage = () => {

  const navigate = useNavigate();

  const [apikey, setApikey] = useState('JpjVBxNDV2zCXJcV9zSk2yTDCrGQfjUr');
  const [paraphrase, setParaphrase] = useState('Welcome22023$');
  const [loadingFlag, setLoadingFlag] = useState('false');

  const setCookieWithExpiration = (cookieName, cookieValue) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 24 * 1000); // 1 hour
  
    Cookies.set(cookieName, cookieValue, { expires: expirationDate });
  };

  const handleSubmit = async () => {
    if (apikey === '') {
      alert('Enter api-key');
    } else if (paraphrase === '') {
      alert('Enter paraphrase')
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          apikey,
          paraphrase
        })
      };

      try {
        setLoadingFlag(true);
        const response = await fetch(`${BACKEND_BASE_URL}/validate`, requestOptions);
        const data = await response.json();
        if (data.isValid) {
          setCookieWithExpiration('isValid', true);
          navigate('/home');
        } else {
          alert('Validation Failed');
        }
        setLoadingFlag(false);
        console.log(data);  
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <Input placeholder="Enter api-key"    value={apikey}     onChange={(e) => setApikey(e.target.value)}/>
        <Input placeholder="Enter paraphrase" value={paraphrase} onChange={(e) => setParaphrase(e.target.value)}/>
        <Button onClick={handleSubmit}>Validation</Button>
        {
          loadingFlag === true && (
            <LoadingContainer>
              <div className="lds-ripple"><div></div><div></div></div>
            </LoadingContainer>
          )
        }
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #1E1E1E;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  * {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  width: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  background-color: transparent;
  outline: 0;
  border-radius: 8px;
  border: 1px solid #EEE;
  padding: 15px 20px;

  width: 90%;

  color: #FFF;
  font-size: 18px;
  font-style: normal;
  line-height: normal;

  margin: 10px;
`

const Button = styled.div`
  background: #FF343F;
  border-radius: 20px;
  padding: 15px 20px;

  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;

  cursor: pointer;
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

export default LoginPage;