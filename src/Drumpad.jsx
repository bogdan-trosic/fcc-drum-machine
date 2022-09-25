function Drumpad({padNum, padKey, audioUrl, playClip}) {
    return (
        <button 
            className="drum-pad" 
            id={`drum-${padNum}`} 
            onClick={playClip} 
            >
                {padKey}
                <audio id={padKey} className="clip" src={audioUrl}></audio>
        </button>
    )
}

export default Drumpad
