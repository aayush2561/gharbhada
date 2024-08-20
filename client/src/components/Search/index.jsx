import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationText, setLocationText] = useState(''); 
  const navigate = useNavigate(); 

  const handleSearch = () => {
    const query = new URLSearchParams({
      searchTerm,
      searchBy,
      location: locationText || selectedLocation, 
    }).toString();
    
    navigate(`/browse?${query}`);
  };

  return (
    <div className="p-4 bg-gray-200 border-r border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Search</h2>

      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={searchBy === 'Room'}
            onChange={() => setSearchBy(searchBy === 'Room' ? '' : 'Room')}
          />
          Room
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={searchBy === 'Roommate'}
            onChange={() => setSearchBy(searchBy === 'Roommate' ? '' : 'Roommate')}
          />
          Roommate
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter location"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
