<?php
require_once './repository/GuruRepository.php';
require_once './models/Guru.php';

$id = $_REQUEST['id'];
$nama_depan = $_REQUEST['nama_depan'];
$nama_belakang = $_REQUEST['nama_belakang'];
$no_hp = $_REQUEST['no_hp'];
$email = $_REQUEST['email'];
$tgl_lahir = $_REQUEST['tgl_lahir'];
$gender = $_REQUEST['gender'];
$jenjang = $_REQUEST['jenjang'];
$hobi = $_REQUEST['hobi'];
$alamat = $_REQUEST['alamat'];

$guru = new Guru();
$guru->setId($id);
$guru->setNamaDepan($nama_depan);
$guru->setNamaBelakang($nama_belakang);
$guru->setNoHp($no_hp);
$guru->setEmail($email);
$guru->setTglLahir($tgl_lahir);
$guru->setGender($gender);
$guru->setJenjang($jenjang);
$guru->setHobi($hobi);
$guru->setAlamat($alamat);

$repo = new GuruRepository();

try {
    $repo->update($guru);
    echo json_encode(array(
        "success" => true,
        "message" => "Guru updated successfully",
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
