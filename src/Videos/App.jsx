import { useState, useRef } from 'react';
import ReactPlayer from 'react-player'
import stageVideo from './assets/stageVideo.mp4'

const App = () => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);



  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    const seekToPosition = parseFloat(e.target.value);
    const seekTime = seekToPosition * duration;
    if (playerRef.current) {
      playerRef.current.currentTime = seekTime;
    }
    setPlayed(seekToPosition);
  };

  const handleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (playerRef.current) {
      playerRef.current.muted = newMutedState;
    }
  };

  const handleBackward = () => {
    if (playerRef.current) {
      const newTime = Math.max(0, playerRef.current.currentTime - 10);
      playerRef.current.currentTime = newTime;
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      const newTime = Math.min(duration, playerRef.current.currentTime + 10);
      playerRef.current.currentTime = newTime;
    }
  };

  const handleFullScreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <h2 style={styles.title}>🎬 Stage Performance</h2>

      <video
        ref={playerRef}
        src={stageVideo}
        width="100%"
        height="372px"
        style={styles.video}
        muted={isMuted}
        onTimeUpdate={(e) => {
          const currentTime = e.target.currentTime;
          const duration = e.target.duration;
          if (duration) {
            setPlayed(currentTime / duration);
          }
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.target.duration);
          if (playerRef.current) {
            playerRef.current.volume = volume;
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Progress Bar */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={played}
        onChange={handleSeek}
        style={styles.progressSlider}
      />
      <p style={styles.time}>
        ⏱ {Math.floor(played * duration)}s / {Math.floor(duration)}s
      </p>

      {/* Volume Control */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        style={styles.volumeSlider}
      />
      <p style={styles.time}>🔊 Volume: {Math.round(volume * 100)}%</p>

      <div style={styles.controls}>
        <button style={styles.button} onClick={handlePlayPause}>
          {isPlaying ? '⏸ Pause' : '▶️ Play'}
        </button>
        <button style={styles.button} onClick={handleMute}>
          {isMuted ? '🔊 Unmute' : '🔇 Mute'}
        </button>
        <button style={styles.button} onClick={handleBackward}>⏪ 10s</button>
        <button style={styles.button} onClick={handleForward}>10s ⏩</button>
        <button style={styles.button} onClick={handleFullScreen}>🔲 Fullscreen</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#2a2a2a',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  video: {
    borderRadius: '8px',
    backgroundColor: '#000'
  },
  progressSlider: {
    width: '100%',
    height: '6px',
    marginTop: '15px',
    background: '#4a4a4a',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none'
  },
  volumeSlider: {
    width: '100%',
    height: '4px',
    marginTop: '10px',
    background: '#4a4a4a',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none'
  },
  time: {
    textAlign: 'center',
    margin: '8px 0',
    fontSize: '14px',
    color: '#ccc'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '20px',
    gap: '10px'
  },
  button: {
    padding: '10px 16px',
    fontSize: '14px',
    backgroundColor: '#4a4a4a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  }
};

export default App;
