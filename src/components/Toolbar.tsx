import { useContext } from "react";
import DataContext from './dataContext'
import { dataType } from "./dataContext";
import configContext from './configContext'
import { configType } from "./configContext";
import {getRandomInt, updateTextDisplays} from "./utils";
import {FRENCH_LAYOUT, ENGLISH_LAYOUT, LIVES_BY_LEVELS} from "./constants";
import './style.css';

const VISIBILITY = true;

function Toolbar() {
  const {data, setData} = useContext(DataContext);
  const {config, setConfig} = useContext(configContext);
  return (
    <div className="toolbar-container">
        <div className="container">
            <div className="toolbar-button-container"> 
              <button id="restart" className="toolbar-button" onClick={restartButton(data,setData,config)}> Restart </button>
            </div>
            <div className="toolbar-button-container"> 
              <button id="level" className="toolbar-button" onClick={levelButton(config,setConfig)}> Level : Difficult </button>
            </div>
            <div className="toolbar-button-container"> 
              <button id="language" className="toolbar-button" onClick={languageButton(data,setData,config,setConfig)}>FRENCH</button> 
            </div>
            <div className="toolbar-button-container" onClick={aboutButton()}> 
              <button id="about" className="toolbar-button">About</button> 
            </div>
        </div>
    </div>

  );
}

function restartButton(data:dataType, setData:any, config:configType) : any {
  return(
    () => {
      // randomly select a new word
      let allWords : string[] = config.words[config.language]
      let newWord : string = data.word;
      while (newWord === data.word) {
        newWord = allWords[getRandomInt(0,allWords.length)]
      }
      // init the data state
      setData({
        word : newWord,
        knowledge : new Array(newWord.length).fill(VISIBILITY),
        lives : LIVES_BY_LEVELS[config.level],
        spaces : newWord.length});
      // clean keyboard buttons
      for (var i=0; i < config.alphabet.length; i++) {
          const buttonLetter = document.getElementById("KB-"+config.alphabet[i]) as HTMLButtonElement | null;
          if (buttonLetter != null) {buttonLetter.disabled = false ; buttonLetter.style.backgroundColor = "#777"}
      }
      console.log("Restart the game")
    }
  )
}

function levelButton(config:any, setConfig:any) {
  return(
    () => {
      // update the game level
      let newLevel : number = (config.level + 1) % 3;
      setConfig({...config, level : newLevel});
      // update level button
      let layout = (config.language === "french") ? FRENCH_LAYOUT : ENGLISH_LAYOUT;
      let levelButton = document.getElementById("level");
      let levelName = layout.levels[newLevel].toUpperCase();
      if (levelButton != null)
        {levelButton.innerHTML = layout.level + " : " + levelName};
      console.log("Set level to " + levelName)
    }
  )
}

function languageButton(data:dataType, setData:any, config:any, setConfig:any) {
  return(() => {
      // update the config state
      const newLanguage = (config.language === "french") ? "english" : "french";
      setConfig({...config, language:newLanguage})
      // update all buttons and text displays
      updateTextDisplays(newLanguage,config.level);
      console.log("Switch to " + newLanguage.toUpperCase())
    }
  )
}

function aboutButton() {
  return(
    () => {
      console.log("About");
    }
  )
}

export default Toolbar;
