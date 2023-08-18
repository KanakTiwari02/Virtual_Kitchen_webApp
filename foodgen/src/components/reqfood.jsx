import React, { useState } from "react";

const Reqfood = (prop) => {

    const [inputMember , setInputMember] = useState("");
    const [inputDish , setInputDish] = useState("")
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [outputTextStyle, setOutputTextStyle] = useState('none');
  const [audioPlayer, setAudioPlayer] = useState(null); // Track the audio player instance
  const [isPlaying, setIsPlaying] = useState(false); 
  //Track the playing state of audio


    const handleSubmit = async () => {
        try {
          setLoading('block');
          console.log('running');
          const query = new URLSearchParams({ member : inputMember, dish : inputDish });
          const response = await fetch(`http://127.0.0.1:5000/requiredfood?${query}`);
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


    const handleAudioPlay = async (query) => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/download_rq?param=${query}`);
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

      const handleClosePopup = () => {
        setOutputTextStyle('none');
        if (audioPlayer) {
          audioPlayer.pause();
          setIsPlaying(false);
        }
      };

      const handleAudioPause = () => {
        if (audioPlayer) {
          audioPlayer.pause();
          setIsPlaying(false);
        }
      };


    return(<div className="input-container" style={{ display: prop.dis}}>
    <input
      id="inputText"
      type="number"
      value={inputMember}
      onChange={(e) => setInputMember(e.target.value)}
      placeholder="For how many member you want to prepare food..."
    />
        <input
      id="inputText"
      type="text"
      value={inputDish}
      onChange={(e) => setInputDish(e.target.value)}
      placeholder="What dish you want to make..."
    />
    <button id="submitButton"  onClick={handleSubmit}>
      Submit
    </button>


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


  </div>
);
}

export default Reqfood;