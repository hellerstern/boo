import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import Provider from './Provider';
import ImagePage from './pages/Image/ImagePage';
import LoginPage from './pages/Login/LoginPage';

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
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/images/:imgId' element={<ImagePage />} />
          <Route path='*' element={<h1>What are you doing here?</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}



export default App;