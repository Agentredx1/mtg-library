import React, { useState } from 'react';

function SearchBox() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("User entered:", inputValue);
    // You can now use inputValue in a fetch or wherever else
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter a card name" 
        value={inputValue} 
        onChange={handleChange} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBox;
