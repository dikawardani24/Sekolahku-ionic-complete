<?php
require_once './repository/SiswaRepository.php';

$nama = $_REQUEST['id'];
$repo = new SiswaRepository();

try {
    $repo->delete($nama);
    echo json_encode(array(
        "success" => true,
        "message" => "Siswa deleted successfully",
    ));
} catch (PDOException $exc) {
    if ($exc->getCode() == 2002) {
        $error = "Couldn't connect to database";
    } else {
        $error = $exc->getMessage();
    }

    echo json_encode(array(
        "success" => false,
        "error" => $error,
    ));
}
