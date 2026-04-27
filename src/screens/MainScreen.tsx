import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarScreen } from "./CalendarScreen";
import { ProfileScreen } from "./ProfileScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

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