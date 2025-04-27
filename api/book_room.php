<?php
// filepath: c:\xampp\htdocs\hotel-appdev\api\book_room.php
include('connection.php');

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$room_id = $data['room_id'];
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$address = $data['address'];
$city = $data['city'];
$state = $data['state'];
$zip = $data['zip'];
$country = $data['country'];
$room_type = $data['room_type'];
$check_in_date = $data['check_in_date'];
$check_in_time = $data['check_in_time'];
$check_out_date = $data['check_out_date'];
$occupancy = $data['occupancy'];

$sql = "INSERT INTO room_booking_details 
        (user_id, room_id, name, email, phone, address, city, state, zip, contry, room_type, check_in_date, check_in_time, check_out_date, Occupancy) 
        VALUES 
        ('$user_id', '$room_id', '$name', '$email', '$phone', '$address', '$city', '$state', '$zip', '$country', '$room_type', '$check_in_date', '$check_in_time', '$check_out_date', '$occupancy')";

if (mysqli_query($con, $sql)) {
    http_response_code(201);
    echo json_encode(["message" => "Room booked successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Error: " . mysqli_error($con)]);
}
?>