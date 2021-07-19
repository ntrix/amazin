import React, { createContext, useContext, useEffect, useState } from 'react';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }) {
  const value = useState('');
  return (
    <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>
  );
}
function useShadow(initialState = null) {
  const context = useContext(ShadowContext);
  if (context === undefined) {
    throw new Error('useShadow must be used within a ShadowProvider');
  }

  useEffect(() => {
    if (initialState) context[1](initialState);
  }, [initialState]);
  return context;
}
export { ShadowProvider, useShadow };
