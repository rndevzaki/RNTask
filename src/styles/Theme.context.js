import React, {useState} from 'react';
import {Appearance} from 'react-native';

const theme = {
  light: {
    primary: '#189A61',
    buttonBackGround: '#412787',
    buttonTitle: 'white',
    textColor: 'black',
    textSecondary: 'white',
    disabled: 'rgba(216,216,216,216)',
    cardBackGround: '#FFFFFF',
    backGround: 'rgba(67,156,95,0.85)',
    modalBackDrop: 'rgba(158,160,162,162)',
    error: 'red',
    cardIconColor: 'rgba(132,132,132,132)',
    cardRowBackGround: 'rgba(132,132,132,0.5)',
    headerBackground:'#FFFFFF',
  },
  dark: {
    primary: '#189A61',
    buttonBackGround:'#412787',
    buttonTitle: 'white',
    textColor: 'black',
    textSecondary: 'white',
    disabled: 'rgba(216,216,216,216)',
    cardBackGround: '#FFFFFF',
    backGround: 'rgba(67,156,95,0.85)',
    modalBackDrop: 'rgba(158,160,162,162)',
    error: 'red',
    cardIconColor: 'rgba(132,132,132,132)',
    cardRowBackGround: 'rgba(132,132,132,0.5)',
    headerBackground:'#FFFFFF',
  },
};

const getTheme = () => {
  return theme.light;
};

const initialState = {
  dark: false,
  theme: getTheme(),
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({children}) {
  Appearance.addChangeListener(c => {});
  let isDark = false;
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme == 'dark') {
    isDark = true;
  }
  const [dark, setDark] = useState(isDark);

  const toggle = () => {
    setDark(!dark);
  };
  isDark = false;
  //     if(dark){
  //         setTimeout(()=>{
  // StatusBar.setBarStyle('light-content')
  // if(Platform.OS=='android'){
  //     StatusBar.setBackgroundColor('black')
  // }
  //         },300)
  //     }else {
  //         setTimeout(()=>{
  //             StatusBar.setBarStyle('dark-content')
  //             if(Platform.OS=='android'){
  //                 StatusBar.setBackgroundColor('white')
  //             }
  //                     },300)

  //     }
  const theme = getTheme();
  return (
    <ThemeContext.Provider value={{theme, dark, toggle}}>
      {children}
    </ThemeContext.Provider>
  );
}
export {ThemeProvider, ThemeContext};
