import React from 'react';
import {VideoCard} from '.';

export default function Video({youtubes = [] }) {
  return (
    <div className="videos_inner">
      {youtubes.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  )
}