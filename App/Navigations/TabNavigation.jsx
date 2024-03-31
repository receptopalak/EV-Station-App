import { View, Text } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import FavoriteScreen from "../Screen/FavoriteScreen/FavoriteScreen";
import ProfileScreen from "../Screen/ProfileScreen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../Utils/Colors";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.ACTIVE,
        }}
      />
      <Tab.Screen name="favorite" component={FavoriteScreen} 
          options={{
            tabBarLabel: "Favorite",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
            tabBarActiveTintColor: Colors.ACTIVE,
          }} />
      <Tab.Screen name="profile" component={ProfileScreen} 
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-sharp" size={size} color={color} />
            ),
            tabBarActiveTintColor: Colors.ACTIVE,
          }}/>
    </Tab.Navigator>
  );
}
