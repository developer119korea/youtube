import { useEffect, useState } from 'react';
import './app.css';
import VideoList from './components/video_list/video_list';
import dotenv from "dotenv";
dotenv.config();

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/videos?part=snippet&chart=mostPopular&maxResults=25&key=${process.env.REACT_APP_API_SERVICE_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);
  return <VideoList videos={videos} />
}

export default App;
