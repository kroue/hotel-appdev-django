<?php
// filepath: c:\xampp\htdocs\hotel-appdev\api\rooms.php
include('connection.php');

$sql = "SELECT * FROM rooms";
$result = mysqli_query($con, $sql);

$rooms = [];
while ($row = mysqli_fetch_assoc($result)) {
    $rooms[] = $row;
}

echo json_encode($rooms);
?>