<?php
require_once './repository/SiswaRepository.php';
require_once './models/Siswa.php';

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

$siswa = new Siswa();
$siswa->setId($id);
$siswa->setNamaDepan($nama_depan);
$siswa->setNamaBelakang($nama_belakang);
$siswa->setNoHp($no_hp);
$siswa->setEmail($email);
$siswa->setTglLahir($tgl_lahir);
$siswa->setGender($gender);
$siswa->setJenjang($jenjang);
$siswa->setHobi($hobi);
$siswa->setAlamat($alamat);

$repo = new SiswaRepository();

try {
    $repo->update($siswa);
    echo json_encode(array(
        "success" => true,
        "message" => "Siswa updated successfully",
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
