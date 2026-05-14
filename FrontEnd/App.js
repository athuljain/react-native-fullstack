
// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Import User Screens
// import LoginScreen from './Screens/LoginScreen';
// import RegisterScreen from './Screens/RegisterScreen';
// import HomeScreen from './Screens/HomeScreen';
// import ProfileScreen from './Screens/ProfileScreen';

// // Import Admin Screens (Ensure these files exist in Screens/Admin/)
// import AdminDashboard from './Screens/Admin/AdminDashboard';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // --- Auth Stack ---
// // Pass setUserRole so LoginScreen can update the role state
// function AuthStack({ setIsLoggedIn, setUserEmail, setUserName, setUserRole }) {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login">
//         {(props) => (
//           <LoginScreen 
//             {...props} 
//             setIsLoggedIn={setIsLoggedIn} 
//             onLoginSuccess={(email, name, role) => {
//               setUserEmail(email);
//               setUserName(name);
//               setUserRole(role || 'User'); // Set role from backend
//             }} 
//           />
//         )}
//       </Stack.Screen>
//       <Stack.Screen name="Register" component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// }

// // --- Admin Stack ---
// function AdminStack({ setIsLoggedIn }) {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Panel' }} />
//       {/* You can add more admin-only screens here */}
//     </Stack.Navigator>
//   );
// }

// // --- Main App Component ---
// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState(''); 
//   const [userName, setUserName] = useState('');
//   const [userRole, setUserRole] = useState('User');

//   // Handle Logout Logic
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserEmail('');
//     setUserName('');
//     setUserRole('User');
//   };

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         {isLoggedIn ? (
//           // Check role to decide which navigator to show
//           userRole === 'Admin' ? (
//             <Tab.Navigator>
//                <Tab.Screen name="AdminHome" component={AdminDashboard} />
//                <Tab.Screen 
//                 name="Logout" 
//                 component={View} 
//                 listeners={{ tabPress: (e) => { e.preventDefault(); handleLogout(); } }}
//               />
//             </Tab.Navigator>
//           ) : (
//             <Tab.Navigator>
//               <Tab.Screen 
//                 name="Home" 
//                 component={HomeScreen} 
//                 initialParams={{ email: userEmail, userName: userName }} 
//               />
//               <Tab.Screen 
//                 name="Profile" 
//                 component={ProfileScreen} 
//                 initialParams={{ email: userEmail }} 
//               />
//               <Tab.Screen 
//                 name="Logout" 
//                 component={View} 
//                 listeners={{ tabPress: (e) => { e.preventDefault(); handleLogout(); } }}
//               />
//             </Tab.Navigator>
//           )
//         ) : (
//           <AuthStack 
//             setIsLoggedIn={setIsLoggedIn} 
//             setUserEmail={setUserEmail} 
//             setUserName={setUserName}
//             setUserRole={setUserRole} // Pass role setter to auth stack
//           />
//         )}
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

// Import User Screens
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import BloodRequestScreen from './Screens/BloodRequsetScreen';

// Import Admin Screens
import AdminDashboard from './Screens/Admin/AdminDashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- Auth Stack ---
function AuthStack({ setIsLoggedIn, setUserEmail, setUserName, setUserRole }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen 
            {...props} 
            setIsLoggedIn={setIsLoggedIn} 
            onLoginSuccess={(email, name, role) => {
              setUserEmail(email);
              setUserName(name);
              setUserRole(role || 'User');
            }} 
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// --- User Home Stack (Nested inside Tabs) ---
// This allows navigation from Home to Blood Request
function HomeStack({ route }) {
  const { email, userName } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        initialParams={{ email, userName }} 
      />
      <Stack.Screen 
        name="BloodRequest" 
        component={BloodRequestScreen} 
        initialParams={{ email }} 
      />
    </Stack.Navigator>
  );
}

// --- Main App Component ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); 
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('User');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setUserRole('User');
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          userRole === 'Admin' ? (
            // Admin View
            <Tab.Navigator screenOptions={{ headerTintColor: '#d32f2f' }}>
               <Tab.Screen name="AdminHome" component={AdminDashboard} options={{ title: 'Dashboard' }} />
               <Tab.Screen 
                name="Logout" 
                component={View} 
                listeners={{ tabPress: (e) => { e.preventDefault(); handleLogout(); } }}
              />
            </Tab.Navigator>
          ) : (
            // User View
            <Tab.Navigator screenOptions={{ headerTintColor: '#d32f2f' }}>
              <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                initialParams={{ email: userEmail, userName: userName }} 
                options={{ headerShown: false }} // Hide tab header because HomeStack has its own
              />
              <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                initialParams={{ email: userEmail }} 
              />
              <Tab.Screen 
                name="Logout" 
                component={View} 
                listeners={{ tabPress: (e) => { e.preventDefault(); handleLogout(); } }}
              />
            </Tab.Navigator>
          )
        ) : (
          <AuthStack 
            setIsLoggedIn={setIsLoggedIn} 
            setUserEmail={setUserEmail} 
            setUserName={setUserName}
            setUserRole={setUserRole}
          />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}