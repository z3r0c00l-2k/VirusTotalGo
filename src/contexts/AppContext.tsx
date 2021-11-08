import React, {createContext, FC} from 'react';

type ContextType = {};

const AppContext = createContext({} as ContextType);

const AppContextProvider: FC = ({children}) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export {AppContext, AppContextProvider};
