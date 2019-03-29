<?php

require_once 'Repostiory.php';
require_once dirname(__DIR__) . '/models/Siswa.php';

class SiswaRepository extends PDORepository
{

    protected function getPrimaryKeyFieldName()
    {
        return "id";
    }

    protected function getTableName()
    {
        return "siswa";
    }

    /**
     * This function is being use to save data siswa to database sekolahku
     * where the table name is siswa
     * @param Siswa $siswa to be saved
     */
    public function save(Siswa $siswa)
    {
        $sql = "INSERT INTO siswa VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array(
            $siswa->getNamaDepan(),
            $siswa->getNamaBelakang(),
            $siswa->getNoHp(),
            $siswa->getEmail(),
            $siswa->getTglLahir(),
            $siswa->getGender(),
            $siswa->getJenjang(),
            $siswa->getHobi(),
            $siswa->getAlamat(),
        ));
    }

    /**
     * This function is being use to update existing data siswa by its id
     * @param Siswa $siswa to updated
     * @throws PDOException if the given id is < 0 or the given id is not exist
     */
    public function update(Siswa $siswa)
    {
        if ($siswa->getId() <= 0) {
            throw new PDOException("Invalid ID Siswa, the given id : {$siswa->getId()}");
        }
        $sql = "UPDATE siswa SET nama_depan=?, nama_belakang=?, no_hp=?, "
            . "email=?, tgl_lahir=?, gender=?, jenjang=?, hobi=?, alamat=? "
            . "WHERE id=?";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array(
            $siswa->getNamaDepan(),
            $siswa->getNamaBelakang(),
            $siswa->getNoHp(),
            $siswa->getEmail(),
            $siswa->getTglLahir(),
            $siswa->getGender(),
            $siswa->getJenjang(),
            $siswa->getHobi(),
            $siswa->getAlamat(),
            $siswa->getId(),
        ));
        
        $updated = $statement->rowCount() > 0;
        if (!$updated) {
             throw new PDOException("No data {$this->getTableName()} with "
                . "{$this->getPrimaryKeyFieldName()}: {$siswa->getId()}");
        }
    }

    /**
     * This function is being use to find data guru by its id
     * @param type $id
     * @return Object of Siswa
     * @throws PDOException if the data is not found
     */
    public function findById($id)
    {
        $sql = "SELECT *FROM siswa WHERE id=?";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array($id));

        $found = $statement->rowCount() > 0;
        if ($found) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        } else {
            throw new PDOException("No data {$this->getTableName()} with "
                . "{$this->getPrimaryKeyFieldName()}: {$id}");
        }
    }

     /**
     * This function is being use to search data siswa by the given name
     * @param string $name to be search
     * @return Object of Siswa
     */
    public function findByName($name)
    {
        $sql = "SELECT *FROM siswa WHERE nama_depan LIKE ? OR nama_belakang LIKE ?";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array("%{$name}%", "%{$name}%"));
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

}
