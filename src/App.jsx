import { useState, useEffect } from 'react'
import './App.css'
import Drumpad from './Drumpad'

const drumsData = [
    {key: 'Q', url: 'https://ucarecdn.com/f30a9024-81d8-48cd-b764-be7cb9245c1c/drum0.mp3', text: 'Tammm'},
    {key: 'W', url: 'https://ucarecdn.com/c4dadc5f-b628-408b-8f1c-7d95ce5d463d/drum1.mp3', text: 'Tommm'},
    {key: 'E', url: 'https://ucarecdn.com/a0ce674c-c24e-45ea-8d72-af460e760a49/drum2.mp3', text: 'Toommm'},
    {key: 'A', url: 'https://ucarecdn.com/9a308ae7-4797-46db-8ba6-8cf64779521a/drum3.mp3', text: 'Czmmm'},
    {key: 'S', url: 'https://ucarecdn.com/80cf5046-69f7-41d0-91a9-3f4688c04d79/drum4.mp3', text: 'Timmm'},
    {key: 'D', url: 'https://ucarecdn.com/68fb8710-dc0e-4759-ab65-7c93bd0b015a/drum5.mp3', text: 'Pommm'},
    {key: 'Z', url: 'https://ucarecdn.com/a7b081ec-d7ac-4aff-b5fc-461ad2830eed/drum6.mp3', text: 'Tummm'},
    {key: 'X', url: 'https://ucarecdn.com/e204d904-0828-48ab-92a4-8f22be0c6e42/drum7.mp3', text: 'Pummm'},
    {key: 'C', url: 'https://ucarecdn.com/e10b042c-f8aa-4a10-a5bf-39b4fa39497a/drum8.mp3', text: 'Paammm'}
]

function playClip(event) {
    let audio
    
    // handle both keyboard and click events
    if (event.target.tagName === 'BODY' && ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'].some(item => event.key === item)) {
        audio = document.getElementById(event.key.toUpperCase())
    } else if (event.target.tagName === 'BUTTON') {
        audio = event.target.children[0]
    } else {
        return
    }

    // don't wait for the audio to play up to the end if triggered before it so controls are more responsive
    if (audio.ended) {
        audio.play()
    } else {
        audio.currentTime = 0
        audio.play()
    }

    // removing focus in case the button is clicked so that it doesn't mess with the event target if keyboard shortcut is used right after
    event.target.blur()
}

function App() {
    const [previewText, setPreviewText] = useState('Press a button :D')

    function updatePreviewText(event) {
        if (event.type === 'keydown' && ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'].some(item => event.key === item)) {
            for (let i = 0; i < drumsData.length; i++) {
                if (drumsData[i].key === event.key.toUpperCase()) {
                    setPreviewText(drumsData[i].text)
                }
            }
        } else if (event.type === 'click' && ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'].some(item => event.target.innerText.toLowerCase() === item)) {
            for (let i = 0; i < drumsData.length; i++) {
                if (drumsData[i].key === event.target.innerText) {
                    setPreviewText(drumsData[i].text)
                }
            }
        } else {
            return
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', playClip)
        window.addEventListener('click', updatePreviewText)
        window.addEventListener('keydown', updatePreviewText)
    }, [])

    return (
        <div className="app drum-machine" id="drum-machine">
            <div className="drum-machine--display" id='display'>
                {previewText}
            </div>
            <div className="drum-machine--pad-container">
                {drumsData.map((item, index) => {
                    return (
                        <Drumpad
                            key={index}
                            padNum={index}
                            padKey={item.key}
                            audioUrl={item.url}
                            playClip={playClip}
                        />)
                })}
            </div>
        </div>
    )
}

export default App
