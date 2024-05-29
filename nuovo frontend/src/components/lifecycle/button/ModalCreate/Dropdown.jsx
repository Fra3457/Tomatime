import React, { useState } from 'react';

const Dropdown = (props) => {
  const {lifeType} = props;
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    lifeType(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown"></label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">Type</option>
        <option value="tomato">tomato</option>
        <option value="short break">short break</option>
        <option value="long break">long break</option>
      </select>
    </div>
  );
};

export default Dropdown;