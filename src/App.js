import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import Provider from './Provider';
import ImagePage from './pages/Image/ImagePage';

// const ScreenCamera = () => {
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     const getScreenStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//         });
//         webcamRef.current.srcObject = stream;
//       } catch (error) {
//         console.error('Error accessing screen stream:', error);
//       }
//     };

//     getScreenStream();
//   }, []);

//   return <Webcam audio={false} ref={webcamRef} />;
// };

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/images/:imgId' element={<ImagePage />}></Route>
          <Route path='*' element={<h1>What are you doing here?</h1>}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}



export default App;