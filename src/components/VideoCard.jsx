import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({video}) {
  return (
    <div className='video_box'>
      <Link to={`/video/${video.id.videoId}`}>
        <img 
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
        />
      </Link>
      <span className='video_title'>{video.snippet.title}</span>
    </div>
  )
}
