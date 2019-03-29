<?php
require_once './repository/GuruRepository.php';

$repo = new GuruRepository();

try {
    $guru_list = $repo->fetchAll();
    echo json_encode(array(
        "success" => true,
        "guru_list" => $guru_list,
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
