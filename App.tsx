import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './SearchScreen';
import DetailsScreen from './DetailsScreen';
import { TouchableOpacity, Image } from 'react-native'; // Import Image from 'react-native'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={({ navigation }) => ({
            headerTitle: '',
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('./assets/back.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 15,
                    marginBottom: 20,
                  }} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


