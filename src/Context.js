import React, {createContext, useState, useCallback} from 'react';

export const NavBarContext = createContext();

export const NavBarContextProvider = ({children}) => {

    const [tabPicked, setTabPicked] = useState('Cards');//default will be cards

    const selectTab = useCallback((e,tabName) => {
        e.preventDefault();
        
        setTabPicked(tabName);
    },[]);
     
     return (
          <NavBarContext.Provider value={{tabPicked, selectTab}}>
              {children}
          </NavBarContext.Provider>
     );
};
