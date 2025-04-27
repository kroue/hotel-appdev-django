import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../api/axios';

export default function RoomListScreen({ navigation }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('rooms.php')
      .then(res => {
        // Map the rooms to include the full image URL
        const updatedRooms = res.data.map(room => ({
          ...room,
          image: `http://172.20.10.2/hotel-appdev/image/rooms/${room.image}`, // Update this base URL to match your setup
        }));
        setRooms(updatedRooms);
      })
      .catch(err => console.error(err));
  }, []);

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RoomDetail', { room: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.roomName}>{item.type}</Text>
        <Text style={styles.roomDetails}>{item.details}</Text>
        <Text style={styles.roomPrice}>${item.price} per night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={item => item.room_id.toString()}
        renderItem={renderRoomItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  image: { width: 100, height: 100 },
  infoContainer: { flex: 1, padding: 10 },
  roomName: { fontSize: 16, fontWeight: 'bold' },
  roomDetails: { fontSize: 14, color: '#666' },
  roomPrice: { fontSize: 16, fontWeight: 'bold', color: '#ff3366' },
});