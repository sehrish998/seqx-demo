import LoginScreen from './src/screens/AuthenticationScreens/LoginScreen';
import RegisterScreen from './src/screens/AuthenticationScreens/RegisterScreen';
import Home from './src/screens/Home/Home';
import HomeScreen from './src/screens/Home/WelcomeScreen';
import PostDetails from './src/screens/Home/PostDetails';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export function AuthenticationFlow(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PostDetails"
        component={PostDetails}
      />
    </Stack.Navigator>
  );
}

export function UnAuthorizedFlow(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}
