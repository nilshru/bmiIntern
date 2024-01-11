import React, { useState, useRef } from 'react';
import './CheckboxStyles.css'; // Import the CSS file with checkbox styles

function PriceFilter({ handleFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (e) => {
    handleFilterChange(e.target.name);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Use CSS to style the dropdown options
  return (
    <div className="checkbox-container">
      <button className='px-4 py-2 mr-2 text-lg font-bold cursor-pointer hover:bg-blue-400 active:bg-blue-400 bg-slate-300' onClick={toggleDropdown}>Filter</button>
      {isOpen && (
        <div className=' mainscroll w-[200px] h-[70px] border rounded-lg border-gray-600 mt-2 p-4 overflow-scroll'>

        <div className="dropdown" ref={dropdownRef} onBlur={closeDropdown} tabIndex={0}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="below_20"
              onChange={handleCheckboxChange}
            />
           Below $20
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="below_100"
              onChange={handleCheckboxChange}
            />
            Below $100
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="below_200"
              onChange={handleCheckboxChange}
            />
           Below $200
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="below_1000"
              onChange={handleCheckboxChange}
            />
            Below $1000
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="below_1500"
              onChange={handleCheckboxChange}
            />
            Below $1500
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="below_3000"
              onChange={handleCheckboxChange}
            />
            Below $3000
          </label>
          
        </div>
        </div>
      )}
    </div>
  );
}

export default PriceFilter;
