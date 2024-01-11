import React from 'react'

function SearchItem({handleSearch, searchQuery}) {
  return (
    <div className="flex justify-end grow">
    <input
      className="flex h-8 w-[150px] sm:w-[250px] mr-1 rounded-md bg-slate-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      type="text"
      placeholder="Serach item..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    ></input>
  </div>
  )
}

export default SearchItem