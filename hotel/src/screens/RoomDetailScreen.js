import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import axios from '../api/axios';

export default function RoomDetailScreen({ route, navigation }) {
  const { room } = route.params;

  const handleBooking = async () => {
    try {
      const response = await axios.post('book_room.php', {
        user_id: 1, // Replace with the logged-in user's ID
        room_id: room.room_id,
        check_in_date: '2025-04-20', // Example date
        check_out_date: '2025-04-25', // Example date
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Room booked successfully!');
        navigation.navigate('Rooms');
      } else {
        Alert.alert('Error', 'Unexpected response. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <Text style={styles.roomName}>{room.type}</Text>
      <Text style={styles.roomDetails}>{room.details}</Text>
      <Text style={styles.roomPrice}>${room.price} per night</Text>
      <Button title="Book Now" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10 },
  roomName: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  roomDetails: { fontSize: 16, marginBottom: 10 },
  roomPrice: { fontSize: 20, fontWeight: 'bold', color: '#ff3366' },
});