import React, { useEffect, useState } from 'react';
import { Video } from '.';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function SearchConts() {

  const [video, setvideo] = useState(null);
  const {searchTerm} = useParams();

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=AIzaSyDPB-yjenojMv0S2miJJ1ejwtSxm_78hEg`
    )
      .then((response) => response.json())
      .then((result) => setvideo(result.items))
      .catch((error) => console.log(error));
  }, [searchTerm]);

  if (!video) return <Loader />;

  return (
    <main id='main'>
      <section id='contents'>
        <h2>검색 결과입니다.{searchTerm}</h2>
        <Video video={video} />
      </section>

    </main>
  )
}
