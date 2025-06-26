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
    
    // API 키 확인
    if (!process.env.REACT_APP_YOUTUBE_API_KEY) {
      setError('YouTube API 키가 설정되지 않았습니다.');
      setLoading(false);
      return;
    }
    
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${selectCategory}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('YouTube API 키에 문제가 있습니다. 새로운 API 키를 발급받아주세요.');
          } else if (response.status === 429) {
            throw new Error('API 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요.');
          } else {
            throw new Error(`API 요청에 실패했습니다. (${response.status})`);
          }
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
