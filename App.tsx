import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation/';
import { ThemeProvider } from 'react-native-elements';


//web      : 710483999898-au86cl51ub3i88mlpp3efakbr17d3ss4.apps.googleusercontent.com
//ios      : 710483999898-snd512a0kkgsadd8odsobi1e7jdk4254.apps.googleusercontent.com
//android  : 710483999898-l7i6di2op0u2u71egmvmkn73m5dguluj.apps.googleusercontent.com

export default function App() {
  return (
    <>
    <ThemeProvider>
    <RootNavigation />
    </ThemeProvider>
    </>
  );
}