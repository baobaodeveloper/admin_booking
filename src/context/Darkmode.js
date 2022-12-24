import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkmodeContext = createContext(INITIAL_STATE);
const darkmodeReducer = (state, action) => {
  switch (action.type) {
    case 'DARK':
      return { darkMode: true };
    case 'LIGHT':
      return { darkMode: false };
    case 'TOGGLE':
      return { darkMode: !state.darkMode };

    default:
      break;
  }
};

const DarkmodeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    darkmodeReducer,
    INITIAL_STATE
  );
  return (
    <DarkmodeContext.Provider
      value={{ darkMode: state.darkMode, dispatch }}
    >
      {children}
    </DarkmodeContext.Provider>
  );
};
export default DarkmodeContextProvider;
