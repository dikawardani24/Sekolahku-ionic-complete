<?php

require_once './repository/SiswaRepository.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$nama = $_REQUEST['nama'];
$repo = new SiswaRepository();

try {
    $datas = $repo->findByName($nama);
    echo json_encode(array(
        "success" => true,
        "siswa_list" => $datas,
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
