import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { BiLike } from 'react-icons/bi';
import Loader from './Loader';
import Category from './Category';

export default function VideoConts() {

  const [videoDetail, setVideoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect (() => {
    setLoading(true);
    setError(null);
    
    fetch (
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('비디오 정보를 가져오는데 실패했습니다.');
        }
        return response.json();
      })
      .then((result) => {
        setVideoDetail(result.items[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching video details:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error">에러: {error}</div>;
  if (!videoDetail?.snippet) return <div className="error">비디오를 찾을 수 없습니다.</div>;
  
  const {
    snippet: {title, channelId, channelTitle, description},
    statistics: {viewCount, likeCount}
  } = videoDetail;

  return (
    <section className='videoConts'>
      <Category />
      <div className='container'>
        <div className='video_sub'>
          <div className='left'>
            <div className='play'>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
            </div>

            <div className='desc'>
              <div className='video_info'>
                <h3>{title}</h3>
                <div className='channel_info'>
                  <Link to={`/channel/${channelId}`}>{channelTitle}</Link>
                  <div className='div'>
                    <span className='view'>
                      <FiSearch className='icon'/>
                      {parseInt(viewCount).toLocaleString()}
                    </span>
                    <span className='like'>
                      <BiLike className='icon' />
                      {parseInt(likeCount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <span>{description}</span>
              </div>
            </div>
          </div>
          <div className='right'></div>
        </div>
      </div>
    </section>
  )
}
