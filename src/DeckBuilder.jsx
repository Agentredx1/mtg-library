import React, { useState } from 'react'
import { useDeckController } from './Controllers/useDeckController.js'
import './Deckbuilder.css'
import DeckStorageControls from './Components/DeckStorageControls.jsx'

export function DeckBuilder() {
  const { deckList, handleDeckSubmit, outputText, saveDeckList, loadDeckList, deleteDeckList, compareVersions } = useDeckController()
  const [deckInput, setDeckInput] = useState('');
  const [deckName, setDeckName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeckSubmit(deckInput, deckName);
  };

  return (
    <>
      <DeckStorageControls
      saveDeckList={saveDeckList}
      loadDeckList={loadDeckList}
      deleteDeckList={deleteDeckList}
      deckList={deckList}
      compareVersions={compareVersions}
      />
    </>
  );
}