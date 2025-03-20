'use client';

import { useState, useRef, useEffect } from 'react';

export default function ReelsPage() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Video sources
  const videos = [
    '/video2.mp4',
    '/video1.mp4',
    '/video3.mp4'
  ];
  
  // Function to cycle to the next video
  const cycleVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setUserInteracted(true);
  };
  
  // Function to handle initial user interaction
  const handleInitialPlay = () => {
    setUserInteracted(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play()
        .then(() => {
          console.log("Video playing with sound");
        })
        .catch(error => {
          console.error("Playback error:", error);
        });
    }
  };
  
  // Effect to handle video changes and ensure audio is playing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      
      // Add event listener for when the video is ready to play
      const handleCanPlay = () => {
        // Only try to play with sound if user has interacted
        if (userInteracted) {
          const playPromise = videoRef.current?.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Ensure the video is not muted
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  videoRef.current.volume = 1.0;
                }
              })
              .catch(error => {
                console.error("Playback prevented:", error);
              });
          }
        } else {
          // If no user interaction yet, play muted (which is allowed by most browsers)
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.error("Muted autoplay failed:", e));
          }
        }
      };
      
      // Add the event listener
      videoRef.current.addEventListener('canplay', handleCanPlay);
      
      // Clean up
      return () => {
        videoRef.current?.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [currentVideo, userInteracted]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative w-full max-w-md h-full max-h-screen">
        {/* Reels container with aspect ratio similar to Instagram */}
        <div className="relative w-full pb-[177.78%]"> {/* 16:9 aspect ratio */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              playsInline
              autoPlay
              controls={false}
            >
              <source src={videos[currentVideo]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Unmute overlay - only shown before user interaction */}
            {!userInteracted && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 cursor-pointer"
                onClick={handleInitialPlay}
              >
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <div className="absolute bottom-20 text-white font-medium bg-black/40 px-4 py-2 rounded-full">
                  Tap to unmute
                </div>
              </div>
            )}
            
            {/* Overlay UI elements */}
            <div className="absolute bottom-6 right-4 z-10">
              <button
                onClick={cycleVideo}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-all"
                aria-label="Next video"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>
            </div>
            
            {/* Video progress indicator */}
            <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1 px-4">
              {videos.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1 rounded-full flex-1 ${index === currentVideo ? 'bg-white' : 'bg-white/30'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}