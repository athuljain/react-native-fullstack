import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const { email } = route.params || { email: 'User' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Logged in as:</Text>
        <Text style={styles.email}>{email}</Text>
        
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Authentication Successful ✅</Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  label: { fontSize: 16, color: '#888' },
  email: { fontSize: 22, fontWeight: 'bold', color: '#007AFF', marginBottom: 30 },
  statusBox: { backgroundColor: '#e8f5e9', padding: 20, borderRadius: 15, width: '100%' },
  statusText: { color: '#2e7d32', textAlign: 'center', fontWeight: '500' },
  logoutBtn: { marginTop: 50 },
  logoutText: { color: '#ff3b30', fontSize: 16, fontWeight: 'bold' }
});