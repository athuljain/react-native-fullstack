

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

// export default function RegisterScreen({ navigation }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     contactNum:'',
//     bloodGroup: '',
//     age:'',
//     district: '',
//     village: '',
//   });

//   const handleRegister = async () => {
//     // 1. Log the data before sending to verify it's not empty
//     console.log("Sending to server:", formData);

//     try {
//       const response = await fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//     name: formData.name || "",
//     email: formData.email || "",
//     password: formData.password || "",
//     contactNum: formData.contactNum || "",
//     age:formData.age || "",
//     bloodGroup: formData.bloodGroup || "",
//     district: formData.district || "",
//     village: formData.village || ""
// }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         Alert.alert("Success", "Account created!");
//         navigation.navigate('Login');
//       } else {
//         // This will show you exactly WHAT the server didn't like
//         Alert.alert("Server Error", data.error || "Check backend console");
//       }
//     } catch (err) {
//       Alert.alert("Connection Error", "Is your server/ngrok running?");
//     }
// };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Register</Text>
      
//       <TextInput style={styles.input} placeholder="Full Name" onChangeText={(v) => setFormData({...formData, name: v})} />
//       <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address" onChangeText={(v) => setFormData({...formData, email: v})} />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(v) => setFormData({...formData, password: v})} />
//      <TextInput 
//   style={styles.input} 
//   placeholder="Contact Number" 
//   keyboardType="phone-pad" 
//   value={formData.contactNum} 
//   onChangeText={(v) => setFormData({...formData, contactNum: v || ''})} 
// />
//       <TextInput style={styles.input} placeholder="Blood Group (e.g. O+)" onChangeText={(v) => setFormData({...formData, bloodGroup: v})} />
//     style={styles.input} 
//   placeholder="Contact Number" 
//   keyboardType="phone-pad" 
//   value={formData.contactNum} 
//   onChangeText={(v) => setFormData({...formData, contactNum: v || ''})} 
// />
    
//       <TextInput style={styles.input} placeholder="District" onChangeText={(v) => setFormData({...formData, district: v})} />
//       <TextInput style={styles.input} placeholder="Village" onChangeText={(v) => setFormData({...formData, village: v})} />

//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 25, paddingTop: 50, backgroundColor: '#fdfdfd' },
//   title: { fontSize: 30, fontWeight: 'bold', marginBottom: 25, color: '#333' },
//   input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
//   button: { backgroundColor: '#d32f2f', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
// });


import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNum: '',
    age: '',
    bloodGroup: '',
    district: '',
    village: '',
  });

  const handleRegister = async () => {
    // Basic validation to ensure no empty fields are sent
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate('Login');
      } else {
        Alert.alert("Server Error", data.error || "Registration failed");
      }
    } catch (err) {
      Alert.alert("Connection Error", "Check if your server and Ngrok are running.");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Register</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Full Name" 
          value={formData.name}
          onChangeText={(v) => setFormData({...formData, name: v})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          autoCapitalize="none" 
          keyboardType="email-address" 
          value={formData.email}
          onChangeText={(v) => setFormData({...formData, email: v})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={formData.password}
          onChangeText={(v) => setFormData({...formData, password: v})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Contact Number" 
          keyboardType="phone-pad" 
          value={formData.contactNum} 
          onChangeText={(v) => setFormData({...formData, contactNum: v || ''})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Age" 
          keyboardType="numeric" 
          value={formData.age} 
          onChangeText={(v) => setFormData({...formData, age: v || ''})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Blood Group (e.g. O+)" 
          value={formData.bloodGroup}
          onChangeText={(v) => setFormData({...formData, bloodGroup: v})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="District" 
          value={formData.district}
          onChangeText={(v) => setFormData({...formData, district: v})} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Village" 
          value={formData.village}
          onChangeText={(v) => setFormData({...formData, village: v})} 
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Extra space at bottom to ensure scrolling works well with keyboard */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, paddingTop: 50, backgroundColor: '#fdfdfd' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 25, color: '#333' },
  input: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  button: { 
    backgroundColor: '#d32f2f', 
    padding: 18, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});