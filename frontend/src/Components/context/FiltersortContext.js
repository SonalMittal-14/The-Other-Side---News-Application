import React, { createContext, useState } from 'react';

export const FiltersortContext = createContext();

export const FiltersortProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState('all news');

  return (
    <FiltersortContext.Provider value={{ search, setSearch, category, setCategory }}>
      {children}
    </FiltersortContext.Provider>
  );
};
