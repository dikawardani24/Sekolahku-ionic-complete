<?php

class Guru
{
    private $id;
    private $namaDepan;
    private $namaBelakang;
    private $noHp;
    private $email;
    private $tglLahir;
    private $gender;
    private $jenjang;
    private $hobi;
    private $alamat;

    public function getId()
    {
        return $this->id;
    }

    public function getNamaDepan()
    {
        return $this->namaDepan;
    }

    public function getNamaBelakang()
    {
        return $this->namaBelakang;
    }

    public function getNoHp()
    {
        return $this->noHp;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getTglLahir()
    {
        return $this->tglLahir;
    }

    public function getJenjang()
    {
        return $this->jenjang;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function getHobi()
    {
        return $this->hobi;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setNamaDepan($namaDepan)
    {
        $this->namaDepan = $namaDepan;
    }

    public function setNamaBelakang($namaBelakang)
    {
        $this->namaBelakang = $namaBelakang;
    }

    public function setNoHp($noHp)
    {
        $this->noHp = $noHp;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setTglLahir($tglLahir)
    {
        $this->tglLahir = $tglLahir;
    }

    public function setJenjang($jenjang)
    {
        $this->jenjang = $jenjang;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function setHobi($hobi)
    {
        $this->hobi = $hobi;
    }

    public function getAlamat()
    {
        return $this->alamat;
    }

    public function setAlamat($alamat)
    {
        $this->alamat = $alamat;
    }
}
