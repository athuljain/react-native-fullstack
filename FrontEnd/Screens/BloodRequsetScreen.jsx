import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function BloodRequestScreen({ navigation, route }) {
    const { email } = route.params || {};
    const [form, setForm] = useState({
        patientFirstName: '', patientLastName: '', bystanderName: '',
        bystanderMobile: '', bloodGroup: '', quantity: '',
        requiredDate: '', district: '', hospital: ''
    });

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/blood-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, requestedBy: email }),
            });
            if (response.ok) {
                Alert.alert("Success", "Admin has been notified!");
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert("Error", "Submission failed");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Blood Request Form</Text>
            {Object.keys(form).map((key) => (
                <TextInput
                    key={key}
                    placeholder={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    style={styles.input}
                    onChangeText={(val) => setForm({ ...form, [key]: val })}
                />
            ))}
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Submit Request</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#d32f2f' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
    btn: { backgroundColor: '#d32f2f', padding: 15, borderRadius: 8, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});