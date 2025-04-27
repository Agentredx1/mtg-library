// Deck Controller
// Is the middleware between UI and logical models in order to better manage state
import { useCallback, useState } from 'react'
import { DeckList } from '../models/DeckList'
import { DeckNode } from '../models/DeckNode'
import { Card } from '../models/Card'

/* useDeckController
    addVersion(cards[], deckName) : DeckNode
    saveDeckList() : void
    loadDeckList() : DeckNode
    handleDeckSubmit(textInput)
    parseDeckInput()
    compareVersions()  
*/

export function useDeckController(deckName = 'My Deck') {
  const [deckList, setDeckList] = useState(new DeckList(deckName))
  const [outputText, setOutputText] = useState('');
  
  function addVersion(cards, deckName) {
    cards = parseDeckInput(cards);
    const newNode = deckList.addDeckNode(cards, deckName);
    
    // trigger re-render
    setDeckList(Object.assign(new DeckList(deckList.name), {
      DeckNodes: [...deckList.DeckNodes]
    }));
  
    return { newNode };
  }
  
  function saveDeckList() {
    try {
      const serializedDeckList = JSON.stringify(deckList);
      localStorage.setItem('deckList', serializedDeckList);
      console.log('DeckList saved to localStorage.');
    } catch (e) {
      console.error('Failed to save deckList:', e);
    }
  }
  
  function loadDeckList() {
    try {
      const serializedDeckList = localStorage.getItem('deckList');
      if (serializedDeckList) {
        const parsed = JSON.parse(serializedDeckList);
  
        // Rebuild the DeckList properly
        const restoredDeckList = new DeckList(parsed.name);
        restoredDeckList.DeckNodes = parsed.DeckNodes.map(deckNodeData => {
          const node = new DeckNode(deckNodeData.cards);
          node.version = deckNodeData.version;
          return node;
        });
        restoredDeckList.tail = restoredDeckList.DeckNodes[restoredDeckList.DeckNodes.length - 1] || null;
  
        setDeckList(restoredDeckList);
        console.log('DeckList loaded from localStorage.');
        console.log(deckList);
      }
    } catch (e) {
      console.error('Failed to load deckList:', e);
    }
  }

  const handleDeckSubmit = useCallback((rawInput, deckName) => {
    const cards = parseDeckInput(rawInput);
    const { newNode } = addVersion(cards, deckName);
    const tail = deckList.tail;
    const previous = deckList.DeckNodes[deckList.DeckNodes.length - 2];
    const { added, removed } = deckList.compareNodes(tail, previous);

    if (deckList.DeckNodes.length === 1) {
      setOutputText(`New deck '${deckName}' created.`);
    } else {
      setOutputText(`Changes:\nAdded: ${[...added].join(", ") || "None"}\nRemoved: ${[...removed].join(", ") || "None"}`);
    }
  
    console.log(deckList);
  }, [deckList, setDeckList, setOutputText]);


  function parseDeckInput(rawInput) {
    try {
      const lines = rawInput.split(/\n/).map(line => line.trim()).filter(line => line !== "");
      const cardMap = new Map();
      for (let line of lines) {
        const match = line.match(/^(\d+)\s+(.+)$/);
        if (match) {
          const count = parseInt(match[1], 10);
          const name = match[2].trim();
          if (cardMap.has(name)) {
            cardMap.set(name, cardMap.get(name) + count);
          } else {
            cardMap.set(name, count);
          }
        }
      }  
      // Convert the map into array of objects
      const cards = Array.from(cardMap.entries()).map(([name, count]) => ({
        name,
        count
      }));
      return cards;
    } catch (e) {
      console.log('Nothing to Parse');
      return [];
    }
  }

  function compareVersions(nodeA, nodeB) {
    return deckList.compareNodes(nodeA, nodeB)
  }

  function deleteDeckList() {
    try {
      localStorage.removeItem('deckList');
      console.log('DeckList deleted from localStorage.');
    } catch (e) {
      console.error('Failed to delete deckList:', e);
    }
  }
  


  //handing off to UI
  return { 
    deckList, 
    outputText, 
    setOutputText, 
    parseDeckInput, 
    addVersion, 
    compareVersions, 
    saveDeckList, 
    loadDeckList, 
    deleteDeckList 
  };

}
