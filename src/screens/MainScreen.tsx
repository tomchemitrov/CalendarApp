import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarScreen } from "./CalendarScreen";
import { ProfileScreen } from "./ProfileScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isSensorAvailable, simplePrompt } from '@sbaiahmed1/react-native-biometrics';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const renderTabIcon = (routeName: string, focused: boolean, color: string, size: number) => {
  let iconName: string;

  switch (routeName) {
    case 'Calendar':
      iconName = focused ? 'calendar' : 'calendar-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'ellipse';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export const MainScreen = () => {
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState(false);
  const [biometricError, setBiometricError] = useState('');

  async function authenticateWithBiometrics() {
    setBiometricError('');

    try {
      const sensor = await isSensorAvailable();
      if (!sensor.available) {
        setIsBiometricAuthenticated(true);
        return;
      }
      const success = await simplePrompt('Authenticate to continue');
      if (success) {
        setIsBiometricAuthenticated(true);
      } else {
        setBiometricError('Authentication failed or was cancelled.');
      }
    } catch (error) {
      setBiometricError(error + '');
    }
  }

  useEffect(() => {
    authenticateWithBiometrics();
  }, []);

  if (!isBiometricAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>{biometricError}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) =>
          renderTabIcon(route.name, focused, color, size),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});