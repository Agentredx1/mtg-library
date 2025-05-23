import React, { useState } from 'react';

export default function DeckStorageControls({
  deckList,
  parseDeckInput,
  addVersion,
  saveDeckList,
  loadDeckList,
  deleteDeckList,
  setOutputText,
  compareVersions
}) {
  const [deckInput, setDeckInput] = useState('');
  const [deckName, setDeckName] = useState('');
  const [selectedVersions, setSelectedVersions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newNode } = addVersion(deckInput, deckName);
  
    if (deckList.DeckNodes.length === 1) {
      setOutputText(`New deck '${deckName}' created.`);
    } else {
      const tail     = deckList.tail;
      const previous = deckList.DeckNodes[deckList.DeckNodes.length - 2];
  
      if (tail && previous && tail.cards && previous.cards) {
        const { added, removed } = deckList.compareNodes(tail, previous);
        setOutputText(
          `Changes:\n` +
          `Added:   ${added.length   ? added.join(", ")   : "None"}\n` +
          `Removed: ${removed.length ? removed.join(", ") : "None"}`
        );
        console.log("Added:",   added);
        console.log("Removed:", removed);
      } else {
        setOutputText("No changes detected.");
      }
    }
  
    console.log(deckList);
  };
  

  const handleVersionSelect = (version) => {
    if (selectedVersions.includes(version)) {
      setSelectedVersions(selectedVersions.filter(v => v !== version));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, version]);
    }
  };

  const handleCompareClick = () => {
    if (selectedVersions.length === 2) {
        const { added, removed } = compareVersions(deckList.DeckNodes[selectedVersions[0]], deckList.DeckNodes[selectedVersions[1]]);
        setOutputText(
          `Changes:\n` +
          `Added:   ${added.length   ? added.join(", ")   : "None"}\n` +
          `Removed: ${removed.length ? removed.join(", ") : "None"}`
        );
        console.log("Added:",   added);
        console.log("Removed:", removed);
    } else {
      alert('Please select exactly two versions to compare.');
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid gray' }}>
      <h3>Deck Storage Controls</h3>

      {/* New input for deck creation */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Deck Name..."
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Enter Decklist (one card per line)..."
          value={deckInput}
          onChange={(e) => setDeckInput(e.target.value)}
          rows={8}
          cols={30}
          required
        />
        <br /><br />
        <button type="submit">Submit Deck</button>
      </form>

      <button onClick={saveDeckList}>Save DeckList</button>
      <button onClick={loadDeckList}>Load DeckList</button>
      <button onClick={deleteDeckList} style={{ color: 'red' }}>
        Delete DeckList
      </button>

      <div style={{ marginTop: '20px' }}>
        <h4>Select Two Versions to Compare:</h4>
        {deckList.DeckNodes.map((node) => (
          <label key={node.version} style={{ display: 'block', margin: '5px 0' }}>
            <input
              type="checkbox"
              checked={selectedVersions.includes(node.version)}
              onChange={() => handleVersionSelect(node.version)}
            />
            Version {node.version}
          </label>
        ))}
        <button onClick={handleCompareClick} style={{ marginTop: '10px' }}>
          Compare Selected Versions
        </button>
      </div>
    </div>
  );
}
