
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include('connection.php');
include('connection.php');

$data = json_decode(file_get_contents("php://input"), true);

// Log the raw input for debugging
error_log("Raw input: " . file_get_contents("php://input"));

if (!$data) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input data"]);
    exit;
}

$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$password = isset($data['password']) ? password_hash($data['password'], PASSWORD_BCRYPT) : null;
$address = $data['address'] ?? null;

if (!$name || !$email || !$password || !$address) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

$sql = "INSERT INTO user (name, email, password, address) VALUES ('$name', '$email', '$password', '$address')";

if (mysqli_query($con, $sql)) {
    http_response_code(201);
    echo json_encode(["message" => "User registered successfully"]);
} else {
    // Log the database error for debugging
    error_log("Database error: " . mysqli_error($con));
    http_response_code(400);
    echo json_encode(["message" => "Error: " . mysqli_error($con)]);
}
?>