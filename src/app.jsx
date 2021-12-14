import { useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';
import dotenv from "dotenv";
import SearchHeader from './components/search_header/search_header';
dotenv.config();

function App() {
  const [videos, setVideos] = useState([]);

  const search = (query) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.REACT_APP_API_SERVICE_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => result.items.map(item => ({ ...item, id: item.videoId })))
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));
  }

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
  return (
    <div className={styles.app} >
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </div >
  );
}

export default App;
