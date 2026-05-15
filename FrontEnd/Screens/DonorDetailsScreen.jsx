import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Alert, ActivityIndicator 
} from 'react-native';

export default function DonorDetailsScreen({ route }) {
  const { email } = route.params;
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contactNum: '',
    bloodGroup: '',
    district: '',
    village: '',
  });

  // 1. Fetch User Data on Mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://staring-scroll-duffel.ngrok-free.dev/api/auth/profile/${email}`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          name: data.name,
          contactNum: data.contactNum,
          bloodGroup: data.bloodGroup,
          district: data.district,
          village: data.village,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch donor details");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Update
  const handleUpdate = async () => {
    try {
      const response = await fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...formData }),
      });

      if (response.ok) {
        Alert.alert("Success", "Details updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update details");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#d32f2f" style={{flex:1}} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Donor Profile</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          value={formData.name} 
          onChangeText={(val) => setFormData({...formData, name: val})} 
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput 
          style={styles.input} 
          value={formData.contactNum} 
          keyboardType="phone-pad"
          onChangeText={(val) => setFormData({...formData, contactNum: val})} 
        />

        <Text style={styles.label}>Blood Group</Text>
        <TextInput 
          style={styles.input} 
          value={formData.bloodGroup} 
          onChangeText={(val) => setFormData({...formData, bloodGroup: val})} 
        />

        <Text style={styles.label}>District</Text>
        <TextInput 
          style={styles.input} 
          value={formData.district} 
          onChangeText={(val) => setFormData({...formData, district: val})} 
        />

        <Text style={styles.label}>Village</Text>
        <TextInput 
          style={styles.input} 
          value={formData.village} 
          onChangeText={(val) => setFormData({...formData, village: val})} 
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#d32f2f' },
  form: { marginBottom: 40 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 5 },
  input: { 
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, 
    padding: 12, marginBottom: 15, fontSize: 16 
  },
  updateButton: { 
    backgroundColor: '#d32f2f', padding: 15, 
    borderRadius: 8, alignItems: 'center', marginTop: 10 
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});