import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import Router from './src/router/Router';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { initAxiosInterceptors } from './src/helpers/initAxiosInterceptor'


initAxiosInterceptors()

export default function App() {


  let [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Router />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </Provider>
  );
}

