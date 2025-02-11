import './App.css'
import Header from '/src/components/Header.jsx'
import LanguageBox from '/src/components/LanguageBox.jsx'
import GuessBox from '/src/components/GuessBox'
import LetterBox from '/src/components/LetterBox'
import DeathBanner from '/src/components/Banner'
import LostBanner from '/src/components/LostBanner'
import WinBanner from '/src/components/WinBanner'
import NewGameButton from '/src/components/NewGameButton'
import { useEffect } from 'react'
import { useState } from 'react'


function App() {
  //initial set up
  const languagesArr = ['HTML', 'CSS', 'JavaScript', 'React', 'Typescript', 'Node.js', 'Python', 'Ruby', 'Assembly']
  const languageBoxBackgroundColor = ["orange", "blue", "yellow", "cyan", "purple", "green", "pink", "red", "grey"]
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const languageBoxElementList = []
  const guessBoxElementList = []
  const letterBoxElementList = []

  //states
  const [word, setWord] = useState("")
  const [correctGuess, setCorrectGuess] = useState([])
  const [wrongGuess, setWrongGuess] = useState([])
  const [chances, setChances] = useState(8)
  const [aliveLanguages, setAliveLanguages] = useState([...languagesArr])
  const [isWrong, setIsWrong] = useState(false)
  const [indexTracker, setIndexTracker] = useState(-1)
  const [newGame, setNewGame] = useState(false)


  //sets the state of word once after all components render on page
  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?length=8")
    .then(res => res.json())
    .then(data => (data[0]))
    .then(word => setWord(word))
    },[newGame])

  for (let i = 0; i < 9; i++) {
    languageBoxElementList.push(
      < LanguageBox 
        classStyle="languageBox" 
        language={languagesArr[i]} 
        color={languageBoxBackgroundColor[i]} 
        aliveLanguages={aliveLanguages}
      />
    )
  }

  for (let i = 0; i < word.length; i++) {
    guessBoxElementList.push(
      <GuessBox 
        value={word.charAt(i)} 
        correct={correctGuess}
      />
    )
  }
  
  for (let i = 0; i < alphabet.length; i++) {
    letterBoxElementList.push(
      <LetterBox 
        value={alphabet.charAt(i)} 
        word={word} 
        correct={correctGuess} 
        wrong={wrongGuess} 
        handleClick={handleClick}
        />
    )
  }

  function handleClick(id) {
    if (word.includes(id.toLowerCase())) {
      setCorrectGuess((prev) => [...prev, id])
      setIsWrong(false)
    } else {
      setWrongGuess((prev) => [...prev, id])
      setChances((prev) => chances - 1)
      setAliveLanguages((prev) => [...prev].slice(1))
      setIsWrong(true)
      setIndexTracker(prev => prev + 1)
    }
  }

  function guessedWord() {
    let counter = 0;

    let wordArr = word.split("")
    let guessArr = [...correctGuess]

    for (let i = 0; i < wordArr.length; i++) {
      for (let k = 0; k < guessArr.length; k++) {
        if (wordArr[i] === `${guessArr[k]}`.toLowerCase()) {
          counter++
        }
      }
    }
    return counter === 8
  }

  function startNewGame() {
    setNewGame((prev) => !prev)
    setWord("")
    setCorrectGuess([])
    setWrongGuess([])
    setChances(8)
    setAliveLanguages([...languagesArr])
    setIsWrong(false)
    setIndexTracker(-1)
  }

  return (
    <>
      <Header />
      {isWrong && chances != 0 && <DeathBanner allLanguages={languagesArr} index={indexTracker}/>}
      {chances == 0 && <LostBanner />}
      {chances != 0 && guessedWord() && <WinBanner />}
      {chances === 0 && <NewGameButton handleClick={startNewGame}/>}
      {(chances != 0 && guessedWord()) && <NewGameButton handleClick={startNewGame}/>}

      <section className='languageBox-container'>
        {languageBoxElementList}
      </section>
      
      <section className='guessBox-container'>
        {guessBoxElementList}
      </section>

      <section className='letterBox-container'>
        {letterBoxElementList}
        {chances === 0 && <div className='letterbox-overlay'></div>}
        {guessedWord() && <div className='letterbox-overlay'></div>}
      </section>
    </>
  )
}

export default App
