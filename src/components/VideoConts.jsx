import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { BiLike } from 'react-icons/bi';
import Loader from './Loader';
import Category from './Category';

export default function VideoConts() {

  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();

  useEffect (() => {
    
    fetch (
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=AIzaSyDPB-yjenojMv0S2miJJ1ejwtSxm_78hEg`
    )
      .then((response) => response.json())
      .then((result) => setVideoDetail(result.items[0]))
      .catch((error) => console.log(error));
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;
  
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
                      {viewCount}
                    </span>
                    <span className='like'>
                      <BiLike className='icon' />
                      {likeCount}
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
