import React from 'react';
import Youtube from 'react-youtube';

const Trailer = ({ selectedMovie }) => {
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === 'Official Trailer'
    );
    const key = trailer
      ? trailer.key
      : selectedMovie.videos.results[0].key;

    return (
      <Youtube
        videoId={key}
        className={'youtube amru'}
        containerClassName={'youtube-container amru'}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            controls: 0,
            cc_load_policy: 0,
            fs: 0,
            iv_load_policy: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
          },
        }}
      />
    );
  };

  return selectedMovie.videos ? renderTrailer() : null;
};

export default Trailer;
