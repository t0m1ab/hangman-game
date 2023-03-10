// useful functions
import { configType } from "./configContext";
import { dataType } from "./dataContext";

import { ALPHABET, FRENCH_KEYWORDS, LIVES_BY_LEVELS, VISIBILITY } from "./constants";


export function initData(setConfig: (value: configType) => void, setData: (value: dataType) => void) {
  return (async () => {
    // fetch words from .txt file
    let frenchWords = await fetchWords("./data/french.txt"); // wait till the dictionnary is loaded
    let englishWords = await fetchWords("./data/english.txt"); // wait till the dictionnary is loaded
    // init the config state (in french and level easy)
    setConfig({
      language: "french",
      alphabet: ALPHABET,
      words: { "french": frenchWords, "english": englishWords },
      level: 0,
      keywords: FRENCH_KEYWORDS
    });
    // init the data state (with a random french word)
    let word: string = frenchWords[getRandomInt(0, frenchWords.length)];
    setData({
      word: word,
      knowledge: new Array(word.length).fill(VISIBILITY),
      lives: LIVES_BY_LEVELS[0],
      spaces: word.length,
    });
  })
}


export function fetchWords(filename: any) {
  return (fetch(filename).then(text => text.text()).then(text => text.split("\n")))
  // let res = await fetch("./data/french.txt");
  // let text = await res.text();
  // let words = text.split("\n")
  // return(words)
}


export function getRandomInt(min: number, max: number) { // random integer in [min,max[
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


export function wordFilter(word: string, knowledge: boolean[]) {
  const letters: String[] = word.toUpperCase().split("");
  let known_letters: String[] = letters.map((elt, index) => (knowledge[index] ? letters[index] : ""))
  return (known_letters)
}