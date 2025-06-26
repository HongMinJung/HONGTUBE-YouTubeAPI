import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Category from './Category';
import { categories } from '../utils/contents';

export default function SearchConts() {

  const [videos, setVideos] = useState(null);
  const [videoStats, setVideoStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [isAllowedSearch, setIsAllowedSearch] = useState(true);
  const {searchTerm} = useParams();
  const navigate = useNavigate();

  // 허용된 검색어인지 확인하는 함수
  const isAllowedSearchTerm = (term) => {
    // searchTerm이 undefined이거나 빈 문자열인 경우 처리
    if (!term || typeof term !== 'string') {
      console.log('검색어가 유효하지 않음:', term);
      return false;
    }
    
    const searchTermLower = term.toLowerCase();
    const allowedTerms = categories.map(category => category.name.toLowerCase());
    
    console.log('검색어:', searchTermLower);
    console.log('허용된 카테고리들:', allowedTerms);
    
    // 더 유연한 매칭 로직
    const isAllowed = allowedTerms.some(allowedTerm => {
      // 정확한 일치
      if (allowedTerm === searchTermLower) {
        console.log('정확한 일치:', allowedTerm);
        return true;
      }
      
      // 부분 일치 (검색어가 카테고리에 포함되거나, 카테고리가 검색어에 포함)
      if (allowedTerm.includes(searchTermLower) || searchTermLower.includes(allowedTerm)) {
        console.log('부분 일치:', allowedTerm);
        return true;
      }
      
      // 키워드 매칭 (패션, 스타일, 뷰티 등)
      const keywords = ['패션', '스타일', '뷰티', 'fashion', 'style', 'beauty'];
      const keywordMatch = keywords.some(keyword => searchTermLower.includes(keyword.toLowerCase()));
      if (keywordMatch) {
        console.log('키워드 매칭:', searchTermLower);
        return true;
      }
      
      return false;
    });
    
    console.log('검색 허용 여부:', isAllowed);
    return isAllowed;
  };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryName) => {
    navigate(`/search/${encodeURIComponent(categoryName)}`);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // API 키 확인
    if (!process.env.REACT_APP_YOUTUBE_API_KEY) {
      setError('YouTube API 키가 설정되지 않았습니다.');
      setLoading(false);
      return;
    }
    
    // 검색어가 허용된 카테고리/채널인지 확인
    const allowed = isAllowedSearchTerm(searchTerm);
    setIsAllowedSearch(allowed);
    
    if (!allowed) {
      setVideos([]);
      setTotalResults(0);
      setLoading(false);
      return;
    }
    
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('YouTube API 키에 문제가 있습니다. 새로운 API 키를 발급받아주세요.');
          } else if (response.status === 429) {
            throw new Error('API 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요.');
          } else {
            throw new Error(`검색 결과를 가져오는데 실패했습니다. (${response.status})`);
          }
        }
        return response.json();
      })
      .then((result) => {
        setVideos(result.items);
        setTotalResults(result.pageInfo?.totalResults || 0);
        
        // 비디오 통계 정보 가져오기
        if (result.items && result.items.length > 0) {
          const videoIds = result.items.map(item => item.id.videoId).join(',');
          fetchVideoStats(videoIds);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [searchTerm]);

  // 비디오 통계 정보 가져오기
  const fetchVideoStats = async (videoIds) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('비디오 통계를 가져오는데 실패했습니다.');
      }
      
      const result = await response.json();
      const stats = {};
      
      result.items.forEach(item => {
        stats[item.id] = {
          viewCount: item.statistics.viewCount,
          likeCount: item.statistics.likeCount,
          duration: item.contentDetails.duration
        };
      });
      
      setVideoStats(stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching video stats:', error);
      setLoading(false);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '오늘';
    if (diffDays <= 7) return `${diffDays}일 전`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  };

  // 동영상 길이 포맷팅 함수
  const formatDuration = (duration) => {
    // duration이 null이거나 undefined인 경우 처리
    if (!duration || typeof duration !== 'string') {
      return '00:00';
    }
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    // 매치가 실패한 경우 처리
    if (!match) {
      return '00:00';
    }
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    let result = '';
    if (hours) result += `${hours}:`;
    result += `${minutes.padStart(2, '0')}:`;
    result += seconds.padStart(2, '0');
    
    return result;
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">에러: {error}</div>;

  return (
    <main id='main'>
      <aside id='aside'>
        <Category />
      </aside>
      <section id='contents' className='search-contents'>
        <div className='search-header'>
          <div className='search-info'>
            <FiSearch className='search-icon' />
            <h2>"{searchTerm ? decodeURIComponent(searchTerm) : '검색어'}" 검색 결과</h2>
            {totalResults > 0 && (
              <span className='result-count'>총 {totalResults.toLocaleString()}개의 결과</span>
            )}
          </div>
        </div>
        
        {!isAllowedSearch ? (
          <div className="no-results">
            <FiSearch className='no-results-icon' />
            <h3>검색 결과가 없습니다</h3>
            <p>다음 카테고리 중에서 검색해보세요:</p>
            <div className='suggested-categories'>
              {categories.slice(0, 6).map(category => (
                <span 
                  key={category.name} 
                  className='category-tag'
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="search-results">
            {videos.map((video, index) => {
              const stats = videoStats[video.id.videoId];
              return (
                <div key={video.id.videoId} className='search-video-card'>
                  <div className='video-thumbnail'>
                    <Link to={`/video/${video.id.videoId}`}>
                      <img 
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                      />
                      {stats?.duration && (
                        <div className='video-duration'>
                          {formatDuration(stats.duration)}
                        </div>
                      )}
                    </Link>
                  </div>
                  
                  <div className='video-info'>
                    <h3 className='video-title'>
                      <Link to={`/video/${video.id.videoId}`}>
                        {video.snippet.title}
                      </Link>
                    </h3>
                    
                    <div className='video-meta'>
                      <Link to={`/channel/${video.snippet.channelId}`} className='channel-name'>
                        {video.snippet.channelTitle}
                      </Link>
                      <span className='publish-date'>
                        {formatDate(video.snippet.publishedAt)}
                      </span>
                    </div>
                    
                    <p className='video-description'>
                      {video.snippet.description.length > 150 
                        ? `${video.snippet.description.substring(0, 150)}...` 
                        : video.snippet.description
                      }
                    </p>
                    
                    <div className='video-stats'>
                      {stats?.viewCount && (
                        <span className='view-count'>
                          <FiEye className='stat-icon' />
                          {parseInt(stats.viewCount).toLocaleString()}회
                        </span>
                      )}
                      {stats?.likeCount && (
                        <span className='like-count'>
                          좋아요 {parseInt(stats.likeCount).toLocaleString()}개
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-results">
            <FiSearch className='no-results-icon' />
            <h3>검색 결과가 없습니다</h3>
            <p>다른 키워드로 검색해보세요.</p>
          </div>
        )}
      </section>
    </main>
  )
}
