import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'compass-sharp' : 'compass-outline'}
              color={color}
              size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle-sharp' : 'add-circle-outline'}
              color={color}
              size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="outfit"
        options={{
          title: 'Outift',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'shirt-sharp' : 'shirt-outline'}
              color={color}
              size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person-circle-sharp' : 'person-circle-outline'}
              color={color}
              size={24} />
          )
        }}
      />
    </Tabs>
  );
}
