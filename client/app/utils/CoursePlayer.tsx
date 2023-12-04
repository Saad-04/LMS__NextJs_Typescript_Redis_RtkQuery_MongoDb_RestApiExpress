import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { promises } from 'dns';

type Props = {
  videoUrl: string;
  title: string;
};
type VideoData = {
  otp: string;
  playbackInfo: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState<VideoData>({
    otp: '',
    playbackInfo: '',
  });

  useEffect(() => {
    axios
      .post('http://localhost:8000/api/v1/generateVideoUrl', {
        videoId: videoUrl, //this videoUrl come from frontend user input
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
      {videoData.otp && videoData?.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allow="encrypted-media"
          allowFullScreen={true}></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
