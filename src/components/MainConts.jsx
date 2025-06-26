import React, { useEffect, useState } from 'react';
import { PiYoutubeLogoDuotone } from 'react-icons/pi';
import Loader from './Loader';
import Category from './Category';
import Video from './Video';

export default function MainConts() {

  const [selectCategory, setSelectCategory] = useState('패션');
  const [youtubes, setYoutubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${selectCategory}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('API 요청에 실패했습니다.');
        }
        return response.json();
      })
      .then((result) => {
        setYoutubes(result.items || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [selectCategory]);

  if (loading) return <Loader />;
  if (error) return <div className="error">에러: {error}</div>;

  return (
    <main id='main'>
      <aside id='aside'>
        <Category selectCategory={selectCategory} setSelectCategory={setSelectCategory} />
      </aside>
      <section id='contents'>
        <h2>
          {selectCategory} <em>영상</em>
          <PiYoutubeLogoDuotone className="youtube_icon" />
        </h2>
        <Video youtubes={youtubes} />
      </section>
    </main>
  )
}
