import { useEffect, useState, useContext } from "react"
import styled from "styled-components";
import { AppContext } from "../context";

import { FiExternalLink } from 'react-icons/fi';
import { BACKEND_BASE_URL } from '../config/config'

const ImagesList = () => {

  const [loadingFlag, setLoadingFlag] = useState(false);

  const AppData = useContext(AppContext);

  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingFlag(true);
        const response = await fetch(`${BACKEND_BASE_URL}/imageslist`);
        const data = await response.json();
        setImages(data.result);
        setLoadingFlag(false);
      } catch (error) {
        setLoadingFlag(false);
        console.log(error);
      }
    })()
  }, [AppData.newImgFlag])

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>
              Number
            </th>
            <th>
              Name
            </th>
            <th>
              Link
            </th>
          </tr>
        </thead>
        {
          !loadingFlag  && (
            <tbody>
              {
                images.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {item.iName}
                    </td>
                    <td>
                      <a href={`/images/${item.iId}`} target="_blank"><FiExternalLink /></a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          )
        }
      </table>
      {
        loadingFlag &&  (
            <div class="lds-ripple"><div></div><div></div></div>
          )
        }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;


  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    margin-top: 30px;
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

  table {
    color: white;
    height: min-content;

    th {
      color: #FFF;
      font-size: 18px;
      font-weight: 700;
      line-height: normal;
      text-align: center;
    }

    td {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      line-height: normal;

      a {
        text-decoration: none;
        color: white;
        cursor: pointer;
      }
    }
    width: 100%;
  }
`

export default ImagesList;