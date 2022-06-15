import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  lowLatency?: boolean;
  hideControls?: boolean;
  customClass?: string;
};

export const Player = ({
  url,
  lowLatency = false,
  hideControls = false,
  customClass = "",
}: Props) => {
  const videoRef = useRef<any>(null);
  const [hls, setHls] = useState<Hls | undefined>(undefined);

  useEffect(() => {
    if (videoRef && Hls.isSupported()) {
      const hls: Hls = new Hls({
        lowLatencyMode: lowLatency,
        liveBackBufferLength: 1,
      });
      setHls(hls);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current!);
    }
  }, [videoRef]);

  function playPause() {
    if (!hls) return;
    if (!hideControls) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  return (
    <video
      onClick={playPause}
      width={800}
      ref={videoRef}
      id="video"
      controls={!hideControls}
      className={customClass}
    ></video>
  );
};
