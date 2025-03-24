import React, { useState, useRef, useEffect } from 'react';
import './Autocomplete.css';

const Autocomplete = ({ suggestions, placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = suggestions.filter(
      suggestion => suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 40 && selectedIndex < filteredSuggestions.length - 1) { // Arrow down
      setSelectedIndex(selectedIndex + 1);
    } else if (e.keyCode === 38 && selectedIndex > 0) { // Arrow up
      setSelectedIndex(selectedIndex - 1);
    } else if (e.keyCode === 13 && selectedIndex >= 0) { // Enter
      handleSelect(filteredSuggestions[selectedIndex]);
    }
  };

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;