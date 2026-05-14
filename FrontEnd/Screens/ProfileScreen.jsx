import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  Image, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ route, navigation }) {
  // 1. Get email from params (Passed from Home or Login)
  const { email } = route.params || {}; 
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
 const [userData, setUserData] = useState(null);

 useEffect(() => {
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://staring-scroll-duffel.ngrok-free.dev/api/auth/profile/${email}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      Alert.alert("Error", "Could not load profile");
    } finally {
      setLoading(false);
    }
  };

if (loading) return <ActivityIndicator style={{flex:1}} />;

  const handleUpdate = async () => {
    try {
      const response = await fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, email }),
      });

      if (response.ok) {
        Alert.alert("Success", "Profile updated!");
        setIsEditing(false);
      }
    } catch (error) {
      Alert.alert("Error", "Update failed");
    }
  };

  // if (loading) return <ActivityIndicator size="large" color="#d32f2f" style={{flex:1}} />;

  return (
   <SafeAreaView style={styles.container}>
       <ScrollView>
         <View style={styles.profileHeader}>
            <Image 
              source={{ uri: userData?.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
              style={styles.profileImg} 
            />
            <Text style={styles.mainName}>{userData?.name}</Text>
            <Text style={styles.bloodTag}>{userData?.bloodGroup}</Text>
         </View>

        <View style={styles.infoSection}>
          <DetailItem label="Full Name" value={userData.name} isEditing={isEditing} 
            onChange={(val) => setUserData({...userData, name: val})} />
          <DetailItem label="Contact" value={userData.contactNum} isEditing={isEditing} 
            onChange={(val) => setUserData({...userData, contactNum: val})} />
          <DetailItem label="District" value={userData.district} isEditing={isEditing} 
            onChange={(val) => setUserData({...userData, district: val})} />
          <DetailItem label="Village" value={userData.village} isEditing={isEditing} 
            onChange={(val) => setUserData({...userData, village: val})} />
        </View>

        <TouchableOpacity 
          style={[styles.btn, isEditing ? styles.saveBtn : styles.editBtn]} 
          onPress={isEditing ? handleUpdate : () => setIsEditing(true)}
        >
          <Text style={styles.btnText}>{isEditing ? "Save Changes" : "Edit Profile"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-component
const DetailItem = ({ label, value, isEditing, onChange }) => (
  <View style={styles.detailBox}>
    <Text style={styles.label}>{label}</Text>
    {isEditing ? (
      <TextInput style={styles.input} value={value} onChangeText={onChange} />
    ) : (
      <Text style={styles.value}>{value || 'Not set'}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileHeader: { alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  profileImg: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#d32f2f' },
  mainName: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  bloodTag: { backgroundColor: '#d32f2f', color: '#fff', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginTop: 5, overflow: 'hidden' },
  infoSection: { padding: 20 },
  detailBox: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  label: { color: '#888', fontSize: 12 },
  value: { fontSize: 16, color: '#333', marginTop: 3 },
  input: { fontSize: 16, color: '#2563EB', marginTop: 3, padding: 5, backgroundColor: '#f0f4ff', borderRadius: 5 },
  btn: { margin: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  editBtn: { backgroundColor: '#333' },
  saveBtn: { backgroundColor: '#2e7d32' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});