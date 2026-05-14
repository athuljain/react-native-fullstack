// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context'; // Fix for Warning

// // Import your screens
// import LoginScreen from './Screens/LoginScreen';
// import RegisterScreen from './Screens/RegisterScreen';
// import HomeScreen from './Screens/HomeScreen';
// import ProfileScreen from './Screens/ProfileScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // 1. Correct AuthStack structure
// function AuthStack({ setIsLoggedIn }) {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login">
//         {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
//       </Stack.Screen>
//       <Stack.Screen name="Register" component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
// return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Tab.Navigator>
//           {/* Always keep Home as the first screen if you want to navigate to it */}
//           <Tab.Screen name="Home" component={HomeScreen} />
          
//           <Tab.Screen name="Profile" component={ProfileScreen} />

//           {isLoggedIn ? (
//             <Tab.Screen 
//               name="Logout" 
//               listeners={{
//                 tabPress: (e) => {
//                   e.preventDefault();
//                   setIsLoggedIn(false);
//                 },
//               }}
//               component={HomeScreen} 
//             />
//           ) : (
//             <Tab.Screen name="Auth">
//               {() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
//             </Tab.Screen>
//           )}
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }


import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack({ setIsLoggedIn, setUserEmail, setUserName }) {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen 
            {...props} 
            setIsLoggedIn={setIsLoggedIn} 
            onLoginSuccess={(email, name) => {
              setUserEmail(email);
              setUserName(name);
            }} 
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); 
  const [userName, setUserName] = useState('');

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              // Pass the current state values as initialParams
              initialParams={{ email: userEmail, userName: userName }} 
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileScreen} 
              initialParams={{ email: userEmail }} 
            />
            <Tab.Screen 
              name="Logout" 
              component={View} 
              listeners={{
                tabPress: (e) => {
                  e.preventDefault();
                  setIsLoggedIn(false);
                  setUserEmail('');
                  setUserName('');
                },
              }}
            />
          </Tab.Navigator>
        ) : (
          <AuthStack 
            setIsLoggedIn={setIsLoggedIn} 
            setUserEmail={setUserEmail} 
            setUserName={setUserName} 
          />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}