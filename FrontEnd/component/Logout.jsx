import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LogoutComponent({ setIsLoggedIn, navigation }) {
  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>your logged</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#EF4444', padding: 15, borderRadius: 12, width: '60%' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  text: { marginBottom: 20, fontSize: 16 }
});