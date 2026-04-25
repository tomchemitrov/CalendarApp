import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginRegisterScreen } from './src/screens/LoginRegisterScreen';
import { MainScreen } from './src/screens/MainScreen';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //TODO: Replace this with actual authentication logic
  useEffect(() => {
    setIsLoading(false);
    setIsLoggedIn(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          {/* {isLoading ? ( */}
            <Stack.Screen name="Splash" component={SplashScreen} />
          {/* ) : isLoggedIn ? ( */}
            <Stack.Screen name="Main" component={MainScreen} />
          {/* ) : ( */}
            <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />
          {/* )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
