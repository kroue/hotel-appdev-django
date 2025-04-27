<?php 
// filepath: c:\xampp\htdocs\hotel-appdev\admin\delete_room.php
include('connection.php');

$id = $_GET['id'];

// Fetch the room details
$sql = mysqli_query($con, "SELECT * FROM rooms WHERE room_id='$id'");
$res = mysqli_fetch_assoc($sql);

if ($res) {
    $img = $res['image'];
    $imgPath = "../image/rooms/$img";

    // Check if the image file exists before attempting to delete it
    if (!empty($img) && file_exists($imgPath)) {
        unlink($imgPath);
    }

    // Delete dependent records in room_booking_details
    $deleteBookingsQuery = "DELETE FROM room_booking_details WHERE room_id='$id'";
    mysqli_query($con, $deleteBookingsQuery);

    // Attempt to delete the room
    $deleteRoomQuery = "DELETE FROM rooms WHERE room_id='$id'";
    if (mysqli_query($con, $deleteRoomQuery)) {
        header('location:dashboard.php?option=rooms');
    } else {
        // Handle foreign key constraint error
        echo "Error: Unable to delete the room. It may be referenced in other records.";
    }
} else {
    echo "Error: Room not found.";
}
?>