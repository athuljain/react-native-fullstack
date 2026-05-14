
import React, { useState } from 'react'; 
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';

export default function LoginScreen({ navigation, setIsLoggedIn, onLoginSuccess }) {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');

const handleLogin = async () => {
   
    try {
      const response = await fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
      
        onLoginSuccess(data.email, data.name); 
        
     
        setIsLoggedIn(true); 
        
      
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Network Error", "Unable to connect to the server.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in with Email or Phone Number</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email or Phone Number</Text>
            <TextInput 
              placeholder="e.g. name@mail.com or 9876543210" 
              style={styles.input} 
              value={identifier}
              onChangeText={setIdentifier} 
              autoCapitalize="none"
              keyboardType="default" 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              placeholder="Enter your password" 
              style={styles.input} 
              secureTextEntry 
              value={password}
              onChangeText={setPassword} 
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>
              Don't have an account? <Text style={styles.linkBold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// FIXED: Added missing styles object
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F3F4F6', 
    padding: 20 
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1F2937', 
    textAlign: 'center',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: { 
    backgroundColor: '#F9FAFB',
    borderWidth: 1, 
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  button: { 
    backgroundColor: '#2563EB', 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: '700' 
  },
  link: { 
    marginTop: 25, 
    color: '#6B7280', 
    textAlign: 'center',
    fontSize: 14 
  },
  linkBold: {
    color: '#2563EB',
    fontWeight: '700',
  }
});