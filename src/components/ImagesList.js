import { useEffect, useState, useContext } from "react"
import styled from "styled-components";
import { AppContext } from "../context";

import { FiExternalLink } from 'react-icons/fi';

const ImagesList = () => {

  const AppData = useContext(AppContext);

  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:443/imageslist');
        const data = await response.json();
        setImages(data.result);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [AppData.newImgFlag])

  return (
    <Wrapper>
      <table>
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
      </table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 45%;

  table {
    color: white;

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