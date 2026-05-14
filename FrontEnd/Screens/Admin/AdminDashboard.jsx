import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AdminDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Control Center</Text>
      </View>
      
      <View style={styles.statGrid}>
        <View style={styles.card}><Text style={styles.cardText}>Total Donors: 24</Text></View>
        <View style={styles.card}><Text style={styles.cardText}>Urgent Needs: 3</Text></View>
      </View>
      
      {/* Admin specific content goes here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, backgroundColor: '#d32f2f' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statGrid: { flexDirection: 'row', padding: 10, justifyContent: 'space-between' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '48%', elevation: 2 },
  cardText: { fontWeight: 'bold' }
});