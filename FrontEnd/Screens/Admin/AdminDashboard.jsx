import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function AdminDashboard() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/all-requests')
            .then(res => res.json())
            .then(data => setRequests(data));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Blood Requests ({requests.length})</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.requestCard}>
                        <Text style={styles.patientName}>{item.patientFirstName} {item.patientLastName}</Text>
                        <Text>Blood Group: {item.bloodGroup} | Quantity: {item.quantity}</Text>
                        <Text>Hospital: {item.hospital}, {item.district}</Text>
                        <Text style={styles.date}>Needed by: {item.requiredDate}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F3F4F6' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    requestCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
    patientName: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f' },
    date: { color: '#666', marginTop: 5, fontStyle: 'italic' }
});