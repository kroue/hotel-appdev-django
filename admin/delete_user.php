<?php 
// filepath: c:\xampp\htdocs\hotel-appdev\admin\delete_user.php
include('connection.php');

$id = $_GET['id'];

// Delete the user
if (mysqli_query($con, "DELETE FROM user WHERE id='$id'")) {
    header('location:dashboard.php?option=user_registration');	
} else {
    echo "Error: Unable to delete user.";
}
?>