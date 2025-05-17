import { useEffect, useState, useRef } from "react";

import type { Song } from "../types/Song";

import Header from "../components/Header";

import SearchBox from "../components/SearchBox";
import SongRow from "../components/SongRow";

import socket from "../socket";
import AutoScroll from "../components/AutoScroll";
import WaitingForSong from "../components/WaitingForSong";

export default function Main() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSongId, setCurrentSongId] = useState("none");
  const [autoScroll, setAutoScroll] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 20;
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoScroll]);

  const fetchSongById = async (id: string) => {
    if (!id || id === "none") {
      setCurrentSong(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/songs/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch song");
      }

      const data = await res.json();
      setCurrentSong(data);
    } catch (error) {
      console.error("Error fetching song:", error);
      setCurrentSong(null);
    }
  };

  useEffect(() => {
    socket.on("songSelected", (data) => {
      setCurrentSongId(data);
    });

    return () => {
      socket.off("songSelected");
    };
  }, []);

  useEffect(() => {
    if (currentSongId !== "") {
      socket.emit("songSelected", currentSongId);
    }
  }, [currentSongId]);

  useEffect(() => {
    fetchSongById(currentSongId);
  }, [currentSongId]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/songs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch songs");
        }

        const data = await res.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />

      <div
        className="flex-1 overflow-auto px-4 py-8 sm:px-8 md:px-12"
        ref={scrollRef}
      >
        {!user.isAdmin && currentSongId == "none" && <WaitingForSong />}

        {currentSongId != "none" && (
          <>
            {user.isAdmin && (
              <div
                className="fixed top-28 right-8 h-16 w-16 items-center justify-center rounded-full bg-white md:top-32 md:right-20"
                onClick={() => setCurrentSongId("none")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 485 485"
                >
                  <g>
                    <path d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5   s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026   C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5   S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z" />
                    <rect x="140" y="140" width="205" height="205" />
                  </g>
                </svg>
              </div>
            )}
            <div className="w-full space-y-6 rounded-lg border bg-white p-4 sm:p-8">
              {currentSong?.words?.map((line, index) => (
                <div key={index} className="flex flex-wrap gap-x-4 gap-y-2">
                  {line.map((word, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {user.instrument !== "vocals" && (
                        <div className="text-primary min-h-6 text-sm font-semibold">
                          {word.chords ?? ""}
                        </div>
                      )}
                      <div className="text-lg">{word.lyrics}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <AutoScroll autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
          </>
        )}

        {user.isAdmin && currentSongId == "none" && (
          <div className="flex flex-1 flex-col gap-8 p-4">
            <SearchBox
              placeholder="Search any song..."
              suggestions={songs.map((song) => song.name)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex flex-col gap-2">
              <p className="text-md font-600">Recommended song list</p>
              {filteredSongs.map((song) => (
                <SongRow
                  id={song._id}
                  name={song.name}
                  singer={song.singer}
                  imageUrl={song.imageUrl}
                  onSelect={setCurrentSongId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
