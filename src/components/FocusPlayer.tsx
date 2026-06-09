import React, { useState, useEffect, useRef } from "react";
import { Song } from "../types";
import { songsPlaylist } from "../data";

interface FocusPlayerProps {
  onSongChange?: (song: Song) => void;
}

export default function FocusPlayer({ onSongChange }: FocusPlayerProps) {
  const [playlist] = useState<Song[]>(songsPlaylist);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favSongs, setFavSongs] = useState<Record<string, boolean>>({ "s-1": true });
  const [currentTimeSec, setCurrentTimeSec] = useState(105); // Initial: 1:45
  
  const currentSong = playlist[songIndex];
  const tickerRef = useRef<number | null>(null);

  // Trigger song change callback for ambient effects
  useEffect(() => {
    if (onSongChange) {
      onSongChange(currentSong);
    }
  }, [songIndex, onSongChange, currentSong]);

  // Handle Playback Clock Ticking
  useEffect(() => {
    if (isPlaying) {
      tickerRef.current = window.setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= currentSong.durationSec) {
            // Auto skip next on finish
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (tickerRef.current) {
        clearInterval(tickerRef.current);
      }
    }

    return () => {
      if (tickerRef.current) {
        clearInterval(tickerRef.current);
      }
    };
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTimeSec(0);
    setSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTimeSec(0);
    setSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const toggleFavorite = () => {
    setFavSongs((prev) => ({
      ...prev,
      [currentSong.id]: !prev[currentSong.id]
    }));
  };

  // Convert seconds into standard minute:seconds format
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const percentage = (currentTimeSec / currentSong.durationSec) * 100;

  // Manual Seek Bar Interaction
  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const computedPercentage = clickX / rect.width;
    const nextTime = Math.round(computedPercentage * currentSong.durationSec);
    setCurrentTimeSec(nextTime);
  };

  return (
    <section className="md:col-span-7 glass p-6 rounded-[2rem] inner-glow flex flex-col md:flex-row gap-6 items-center transition-all duration-300">
      
      {/* Album cover / visualizer */}
      <div className="w-full md:w-44 aspect-square rounded-2xl overflow-hidden shadow-2xl relative group/album select-none shrink-0 border border-white/5 bg-background">
        <img
          alt={currentSong.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-105" : "scale-100 opacity-90"}`}
          src={currentSong.cover}
          referrerPolicy="no-referrer"
        />
        
        {/* Absolute equalizer overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-100 group-hover/album:bg-black/60 transition-all">
          <div className="flex items-end gap-1.5 h-12 w-16 px-2 justify-center" id="wave-bars-container">
            {/* CSS Bouncing Equalizer Bars */}
            <div className={`w-1.5 rounded-full ${currentSong.equalizerColor} ${isPlaying ? "animate-[bounce_0.8s_infinite_0s]" : "h-2"}`} style={{ height: isPlaying ? "auto" : "8px", minHeight: "6px" }}></div>
            <div className={`w-1.5 rounded-full ${currentSong.equalizerColor} ${isPlaying ? "animate-[bounce_0.5s_infinite_0.2s]" : "h-5"}`} style={{ height: isPlaying ? "auto" : "18px", minHeight: "6px" }}></div>
            <div className={`w-1.5 rounded-full ${currentSong.equalizerColor} ${isPlaying ? "animate-[bounce_0.7s_infinite_0.1s]" : "h-3"}`} style={{ height: isPlaying ? "auto" : "12px", minHeight: "6px" }}></div>
            <div className={`w-1.5 rounded-full ${currentSong.equalizerColor} ${isPlaying ? "animate-[bounce_0.6s_infinite_0.3s]" : "h-6"}`} style={{ height: isPlaying ? "auto" : "24px", minHeight: "6px" }}></div>
            <div className={`w-1.5 rounded-full ${currentSong.equalizerColor} ${isPlaying ? "animate-[bounce_0.8s_infinite_0.15s]" : "h-4"}`} style={{ height: isPlaying ? "auto" : "15px", minHeight: "6px" }}></div>
          </div>
        </div>
      </div>

      {/* Info panel & control nodes */}
      <div className="flex-1 w-full flex flex-col justify-between h-full py-1">
        <div>
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h3 className="font-headline-lg font-bold text-xl text-on-surface truncate group-hover:text-primary transition-colors">
                {currentSong.title}
              </h3>
              <p className="text-on-surface-variant text-sm truncate uppercase tracking-wider font-medium opacity-80 mt-0.5">
                {currentSong.artist}
              </p>
            </div>
            
            <button
              onClick={toggleFavorite}
              className={`p-1.5 rounded-full hover:bg-surface-container-high/30 cursor-pointer active:scale-90 transition-all shrink-0 ${
                favSongs[currentSong.id] ? "text-[#ffb4ab] active-glow" : "text-on-surface/40 hover:text-on-surface"
              }`}
              id={`fav-btn-${currentSong.id}`}
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: favSongs[currentSong.id] ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
            </button>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-[11px] font-mono mb-2 text-on-surface/50 font-medium select-none">
              <span>{formatTime(currentTimeSec)}</span>
              <span>{formatTime(currentSong.durationSec)}</span>
            </div>
            
            {/* Interactive Progress seeking slider */}
            <div
              onClick={handleSeekClick}
              className="h-1.5 w-full bg-surface-container rounded-full relative overflow-visible group cursor-pointer border border-white/5 shadow-inner"
              id="focus-player-timeline"
            >
              <div
                className="absolute top-0 left-0 h-full bg-on-surface/85 group-hover:bg-primary rounded-full transition-colors"
                style={{ width: `${percentage}%` }}
              ></div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ left: `calc(${percentage}% - 7px)` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Player buttons */}
        <div className="flex items-center justify-center gap-7 mt-5">
          <button
            onClick={handlePrev}
            className="text-on-surface/50 hover:text-on-surface p-1.5 hover:bg-white/5 active:scale-90 rounded-full transition-all cursor-pointer"
            id="focus-btn-prev"
            title="Previous Track"
          >
            <span className="material-symbols-outlined text-2xl select-none pointer-events-none">skip_previous</span>
          </button>

          <button
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-on-surface text-background flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg hover:shadow-white/5"
            id="focus-btn-play-pause"
            title={isPlaying ? "Pause Track" : "Play Track"}
          >
            <span className="material-symbols-outlined text-[26px] select-none pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>

          <button
            onClick={handleNext}
            className="text-on-surface/50 hover:text-on-surface p-1.5 hover:bg-white/5 active:scale-90 rounded-full transition-all cursor-pointer"
            id="focus-btn-next"
            title="Next Track"
          >
            <span className="material-symbols-outlined text-2xl select-none pointer-events-none">skip_next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
