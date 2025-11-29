import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const Play = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Pause = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const recordings = [
  {
    id: 1,
    question: "Strategy for attempting the NET Exam from my experience?",
    audio: "/audio/Strategy for attempting the NET Exam from my experience.mp3",
  },
  {
    id: 2,
    question: "My Experience from entering to leaving the exam hall?",
    audio: "/audio/My Experience from entering to leaving the exam hall.mp3",
  },
  {
    id: 3,
    question: "Conclusion and Tips for future aspirants from my experience?",
    audio: "/audio/Conclusion-and-Tips-for-future-aspirants.mp3",
  },
];

export default function NetExperience() {
  const [activeId, setActiveId] = useState(null);
  const audioRefs = useRef({});

  const togglePlay = (id) => {
    const currentAudio = audioRefs.current[id];

    // Pause other audios
    Object.keys(audioRefs.current).forEach((key) => {
      if (parseInt(key) !== id) audioRefs.current[key].pause();
    });

    // Toggle current audio
    if (activeId === id) {
      currentAudio.pause();
      setActiveId(null);
    } else {
      currentAudio.play();
      setActiveId(id);
    }
  };

  return (
    <div className="h-screen select-none bg-black text-blue-400 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-16 text-center"
      >
        NET Exam Experience
      </motion.h1>

      <div className="grid bg-[#0d0d0d] border border-blue-700 rounded-2xl p-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#0d0d0d] h-full border border-blue-700 shadow-lg rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-4 text-blue-300">{item.question}</h2>

              <audio
                controls
                className="w-full mt-2"
                ref={(el) => (audioRefs.current[item.id] = el)}
                onPause={() => activeId === item.id && setActiveId(null)}
              >
                <source src={item.audio} type="audio/mp3" />
              </audio>

              <button
                className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-2 flex gap-2 justify-center items-center"
                onClick={() => togglePlay(item.id)}
              >
                {activeId === item.id ? <Pause /> : <Play />}
                {activeId === item.id ? "Pause" : "Play"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
