import React, { useEffect, useState } from 'react';
import { PiYoutubeLogoDuotone } from 'react-icons/pi';
import Loader from './Loader';
import Category from './Category';
import Video from './Video';

export default function MainConts() {

  const [selectCategory, setSelectCategory] = useState('패션');
  const [youtubes, setYoutubes] = useState([]);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${selectCategory}&type=video&key=AIzaSyDPB-yjenojMv0S2miJJ1ejwtSxm_78hEg`
    )
      .then((response) => response.json())
      .then((result) => setYoutubes(result.items || []))
      .catch((error) => console.log(error));
  }, [selectCategory]);

  if (!Video) return <Loader />;

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
