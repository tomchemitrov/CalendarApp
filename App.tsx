import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginRegisterScreen } from './src/screens/LoginRegisterScreen';
import { MainScreen } from './src/screens/MainScreen';
import { useAuth } from './src/hooks/useAuth';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { isLoading, user } = useAuth();

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
