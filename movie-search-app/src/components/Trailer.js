import React from 'react';
import Youtube from 'react-youtube';

const Trailer = ({ selectedMovie }) => {
  // Function to render the YouTube trailer
  const renderTrailer = () => {
    // Find the trailer with name 'Official Trailer'
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === 'Official Trailer'
    );
    // Get the key of the trailer video
    const key = trailer
      ? trailer.key
      : selectedMovie.videos.results[0].key; // Use the first video if 'Official Trailer' is not found

    // Return the YouTube component with the trailer video
    return (
      <Youtube
        videoId={key}
        className={'youtube amru'}
        containerClassName={'youtube-container amru'}
        opts={{
          width: '100%',
          height: '500px',
          playerVars: {
            autoplay: 1,
            controls: 0,
            cc_load_policy: 0,
            fs: 0,
            iv_load_policy: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            playsinline: 1
          },
        }}
      />
    );
  };

  // Render the trailer if 'selectedMovie.videos' is not null, otherwise return null
  return selectedMovie.videos ? renderTrailer() : null;
};

export default Trailer;
