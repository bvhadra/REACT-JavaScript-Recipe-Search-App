import React, { useState } from 'react';
import './styles/SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter ingredient..." 
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
