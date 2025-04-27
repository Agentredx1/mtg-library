import React, { useState } from 'react';

function CardSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!searchTerm.trim()) return;

        fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(searchTerm)}`, {
            headers: {
                'User-Agent': 'MGTMyApp/0',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                throw new Error('Card not found');
                }
                return response.json();
            })
            .then(data => {
                setCardData(data);
                setError(null);
            })
            .catch(err => {
                setCardData(null);
                setError(err.message);
            });
    };

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter card name"
              value={searchTerm}
              onChange={handleChange}
            />
            <button type="submit">Search</button>
          </form>
    
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    
          {cardData && (
            <div style={{ marginTop: '1rem' }}>
              <h2>{cardData.name}</h2>
              {cardData.image_uris && (
                <img src={cardData.image_uris.normal} alt={cardData.name} />
              )}
              <p>{cardData.oracle_text}</p>
            </div>
          )}
        </div>
      );
}
    
export default CardSearch;    
