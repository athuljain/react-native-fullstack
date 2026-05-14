import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // CORRECT IMPORT

export default function HomeScreen({ route}) {
  const { userName, email } = route.params || {};
  return (
   <SafeAreaView style={styles.container}>
   <View style={styles.header}>
        <Text style={styles.label}>Welcome,</Text>
        {/* Use the variable from params */}
        <Text style={styles.userNameText}>{userName || 'User'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: '#d32f2f' }]}
          onPress={() => console.log('Donor Pressed')}
        >
          <Text style={styles.buttonText}>Donor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: '#2563EB' }]}
          onPress={() => console.log('Want Blood Pressed')}
        >
          <Text style={styles.buttonText}>Want Blood?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20 },
  email: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  mainButton: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3
  },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});