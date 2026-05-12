import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import { useState } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Login">
  {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
</Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator 
       
        initialRouteName={isLoggedIn ? "Home" : "Auth"}
      >
    <Tab.Screen name="Home" component={HomeScreen} />
        
        {isLoggedIn ? (
          <Tab.Screen name="Logout">
            {(props) => <LogoutComponent {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        ) : (
         <Tab.Screen name="Auth">
  {() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
</Tab.Screen>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}