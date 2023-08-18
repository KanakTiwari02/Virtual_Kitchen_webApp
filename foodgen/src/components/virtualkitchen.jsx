import React, { useState, useEffect } from 'react';
import './style.css';
import Reqfood from './reqfood';

function VirtualKitchen() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [outputTextStyle, setOutputTextStyle] = useState('none');
  const [container, setContainer] = useState('none');
  const [option, setOption] = useState('block');
  const [audioPlayer, setAudioPlayer] = useState(null); // Track the audio player instance
  const [isPlaying, setIsPlaying] = useState(false); 
  const [rqFood , setRqFood] = useState('none');// Track the playing state of audio

  useEffect(() => {
    // Cleanup function to stop audio playback when popup is closed
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
      }
    };
  }, [audioPlayer]);

  const handleSubmit = async () => {
    try {
      setLoading('block');
      console.log('running');
      const query = new URLSearchParams({ param: inputText });
      const response = await fetch(`http://127.0.0.1:5000/makefood_post?${query}`);
      const data = await response.json();
      setLoading('none');
      setOutputTextStyle('block');
      setOutputText(data.data);
      setAudioSrc(data.audio);
      handleAudioPlay(data.audio);
      setPopupVisible(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  
//   const handleSubmitRR = async () => {
//     try {
//       setLoading('block');
//       console.log('running');
//       const query = new URLSearchParams({ param: inputText });
//       const response = await fetch(`http://127.0.0.1:5000/makefood_post?${query}`);
//       const data = await response.json();
//       setLoading('none');
//       setOutputTextStyle('block');
//       setOutputText(data.data);
//       setAudioSrc(data.audio);
//       handleAudioPlay(data.audio);
//       setPopupVisible(true);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

  const handleClosePopup = () => {
    setOutputTextStyle('none');
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioPlay = async (query) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/download?param=${query}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      setAudioPlayer(audio); // Store the audio player instance
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Error playing audio:', error);
        setIsPlaying(false);
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAudioPause = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="OuterContainer">
        <div className="InnerContainer">
      <span className="title">Virtual Kitchen</span>
      <span className='title thirdHeading'>From Kitchen to Community: A Culinary Journey</span>
      </div>
      
      <Reqfood dis={rqFood}/>
      <div className="container" style={{ display: option }}>
        <div className="tiles">
          <a
            className="tile makeFood"
            onClick={() => {
              setContainer('block');
              setOption('none');
            }}
          >
            <span className="tile-title">Make Food</span>
          </a>

          <a
            className="tile requiredFood"
            onClick={() => {
              
              setOption('none');
              setRqFood('block');
            }}
          >
           


            <span className="tile-title">Required Food</span>
          </a>

          
          {/* <div className="tile requiredFood">
            <span className="tile-title">Required Food</span>
          </div> */}
          <div className="tile saveFood">
            <span className="tile-title">Save Food</span>
          </div>
          <div className="tile foodExpiry">
            <span className="tile-title">Info Food</span>
          </div>
        </div>
        </div>
      <div
        id="popup"
        className={`popup ${popupVisible ? 'visible' : ''}`}
        style={{ display: outputTextStyle }}
      >
        <div className="popup-content">
          <span className="close" onClick={handleClosePopup}>
            &times;
          </span>
          <p>{outputText}</p>
          {audioPlayer && (
            <button onClick={isPlaying ? handleAudioPause : handleAudioPlay} className = "playPause">
              {isPlaying ? 'Pause' : 'Play'} Audio
            </button>
          )}
        </div>
      </div>
      <div
        className={`loading ${loading ? 'visible' : ''}`}
        style={{ display: loading }}
      >
        <div className="loading-spinner"></div>
      </div>
      <div className="input-container" style={{ display: container }}>
        <input
          id="textInput"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What Ingredients you have ...."
        />
        <button id="submitButton" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <span className='footer thirdHeading'>Virtual Kitchen: Streamlining Food Management and Reducing Food Waste</span>
      
    </div>
  );
}

export default VirtualKitchen;


