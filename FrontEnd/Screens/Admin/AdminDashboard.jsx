// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// export default function AdminDashboard() {
//     const [requests, setRequests] = useState([]);

//     useEffect(() => {
//         fetch('https://staring-scroll-duffel.ngrok-free.dev/api/auth/all-requests')
//             .then(res => res.json())
//             .then(data => setRequests(data));
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>New Blood Requests ({requests.length})</Text>
//             <FlatList
//                 data={requests}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => (
//                     <View style={styles.requestCard}>
//                         <Text style={styles.patientName}>{item.patientFirstName} {item.patientLastName}</Text>
//                         <Text>Blood Group: {item.bloodGroup} | Quantity: {item.quantity}</Text>
//                         <Text>Hospital: {item.hospital}, {item.district}</Text>
//                         <Text style={styles.date}>Needed by: {item.requiredDate}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: '#F3F4F6' },
//     header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//     requestCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
//     patientName: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f' },
//     date: { color: '#666', marginTop: 5, fontStyle: 'italic' }
// });

import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator, 
    Alert 
} from 'react-native';

export default function AdminDashboard() {
    const [viewMode, setViewMode] = useState('requests'); // 'requests' or 'donors'
    const [requests, setRequests] = useState([]);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data whenever viewMode changes
    useEffect(() => {
        fetchData();
    }, [viewMode]);

    const fetchData = async () => {
        setLoading(true);
        const endpoint = viewMode === 'requests' ? 'all-requests' : 'all-donors';
        
        try {
            const response = await fetch(`https://staring-scroll-duffel.ngrok-free.dev/api/auth/${endpoint}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (viewMode === 'requests') {
                setRequests(data);
            } else {
                setDonors(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            Alert.alert("Error", "Failed to load data from server.");
        } finally {
            setLoading(false);
        }
    };

    // Render logic for Blood Requests
    const renderRequestItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.patientName}>{item.patientFirstName} {item.patientLastName}</Text>
                <View style={styles.bloodBadge}>
                    <Text style={styles.bloodText}>{item.bloodGroup}</Text>
                </View>
            </View>
            <Text style={styles.infoText}><Text style={styles.bold}>Quantity:</Text> {item.quantity} units</Text>
            <Text style={styles.infoText}><Text style={styles.bold}>Hospital:</Text> {item.hospital}</Text>
            <Text style={styles.infoText}><Text style={styles.bold}>District:</Text> {item.district}</Text>
            <Text style={styles.dateText}>Needed by: {item.requiredDate}</Text>
        </View>
    );

    // Render logic for Donors
    const renderDonorItem = ({ item }) => (
        <View style={[styles.card, styles.donorCard]}>
            <View style={styles.cardHeader}>
                <Text style={styles.donorName}>{item.name}</Text>
                <View style={[styles.bloodBadge, { backgroundColor: '#2563EB' }]}>
                    <Text style={styles.bloodText}>{item.bloodGroup}</Text>
                </View>
            </View>
            <Text style={styles.infoText}><Text style={styles.bold}>Contact:</Text> {item.contactNum}</Text>
            <Text style={styles.infoText}><Text style={styles.bold}>Email:</Text> {item.email}</Text>
            <Text style={styles.infoText}><Text style={styles.bold}>Location:</Text> {item.village}, {item.district}</Text>
            <Text style={styles.donationCount}>Total Donations: {item.donationCount || 0}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Custom Tab Switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, viewMode === 'requests' && styles.activeTab]} 
                    onPress={() => setViewMode('requests')}
                >
                    <Text style={[styles.tabText, viewMode === 'requests' && styles.activeTabText]}>
                        Requests ({requests.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, viewMode === 'donors' && styles.activeTab]} 
                    onPress={() => setViewMode('donors')}
                >
                    <Text style={[styles.tabText, viewMode === 'donors' && styles.activeTabText]}>
                        Donors ({donors.length})
                    </Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#d32f2f" />
                    <Text style={styles.loadingText}>Fetching Data...</Text>
                </View>
            ) : (
                <FlatList
                    data={viewMode === 'requests' ? requests : donors}
                    keyExtractor={(item) => item._id}
                    renderItem={viewMode === 'requests' ? renderRequestItem : renderDonorItem}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No {viewMode} found.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    tabContainer: { 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    tab: { 
        flex: 1, 
        paddingVertical: 15, 
        alignItems: 'center', 
        borderBottomWidth: 3, 
        borderBottomColor: 'transparent' 
    },
    activeTab: { borderBottomColor: '#d32f2f' },
    tabText: { fontSize: 15, fontWeight: '700', color: '#6B7280' },
    activeTabText: { color: '#d32f2f' },
    listContent: { padding: 15 },
    card: { 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 12, 
        marginBottom: 15, 
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: '#d32f2f'
    },
    donorCard: { borderLeftColor: '#2563EB' },
    cardHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 10 
    },
    patientName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
    donorName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
    bloodBadge: { 
        backgroundColor: '#d32f2f', 
        paddingHorizontal: 12, 
        paddingVertical: 4, 
        borderRadius: 20 
    },
    bloodText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    infoText: { fontSize: 14, color: '#4B5563', marginBottom: 3 },
    bold: { fontWeight: '700', color: '#374151' },
    dateText: { 
        marginTop: 10, 
        fontSize: 13, 
        color: '#d32f2f', 
        fontStyle: 'italic',
        fontWeight: '600'
    },
    donationCount: {
        marginTop: 10,
        fontSize: 13,
        color: '#2563EB',
        fontWeight: '700'
    },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#9CA3AF', fontSize: 16 },
    loadingText: { marginTop: 10, color: '#6B7280' }
});