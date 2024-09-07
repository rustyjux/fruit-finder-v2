import React, { createContext, useState, useContext } from 'react';

const TreeContext = createContext();

export const TreeProvider = ({ children }) => {
  const [trees, setTrees] = useState([]);

  return (
    <TreeContext.Provider value={{ trees, setTrees }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTrees = () => useContext(TreeContext);