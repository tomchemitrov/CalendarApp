import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginRegisterScreen } from './src/screens/LoginRegisterScreen';
import { MainScreen } from './src/screens/MainScreen';
import { useEffect, useState } from 'react';
import { auth } from './src/utils/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          {isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : user ? (
            <Stack.Screen name="Main" component={MainScreen} />
          ) : (
            <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
