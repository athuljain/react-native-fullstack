
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
import DonorDetailsScreen from './Screens/DonorDetailsScreen';

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
      <Stack.Screen 
        name="DonorDetails" 
        component={DonorDetailsScreen} 
        initialParams={{ email }} 
        options={{ 
          headerShown: true, 
          title: 'Donor Profile',
          headerTintColor: '#d32f2f' 
        }} 
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