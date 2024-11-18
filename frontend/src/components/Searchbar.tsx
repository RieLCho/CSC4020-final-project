import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    if (query.trim()) onSearch(query);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex items-center justify-center space-x-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색할 스크립트를 입력해 주세요."
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary">
        <span className="material-icons-round">search</span>
      </button>
    </form>
  );
};

export default SearchBar;
