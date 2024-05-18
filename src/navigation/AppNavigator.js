import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddTwoNumScreen from '../screens/AddTwoNum';
import Dropdown from '../screens/Search';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddTwoNum">
      <Stack.Screen
          name="Search"
          component={Dropdown}
          options={{title: 'Task 2'}}
        />
        <Stack.Screen
          name="AddTwoNum"
          component={AddTwoNumScreen}
          options={{title: 'Task 1'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
