<?php

require_once 'Repostiory.php';
require_once dirname(__DIR__) . '/models/Guru.php';

class GuruRepository extends PDORepository
{

    protected function getPrimaryKeyFieldName()
    {
        return "id";
    }

    protected function getTableName()
    {
        return "guru";
    }

    /**
     * This function is being use to update existing data guru by its id
     * @param Guru $guru to updated
     * @throws PDOException if the given id is < 0 or the given id is not exist
     */
    public function update(Guru $guru)
    {
        if ($guru->getId() <= 0) {
            throw new PDOException("Invalid ID Guru, the given id : {$guru->getId()}");
        }
        $sql = "UPDATE guru SET nama_depan=?, nama_belakang=?, no_hp=?, "
            . "email=?, tgl_lahir=?, gender=?, jenjang=?, hobi=?, alamat=? "
            . "WHERE id=?";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array(
            $guru->getNamaDepan(),
            $guru->getNamaBelakang(),
            $guru->getNoHp(),
            $guru->getEmail(),
            $guru->getTglLahir(),
            $guru->getGender(),
            $guru->getJenjang(),
            $guru->getHobi(),
            $guru->getAlamat(),
            $guru->getId(),
        ));
        
        $updated = $statement->rowCount() > 0;
        if (!$updated) {
             throw new PDOException("No data {$this->getTableName()} with "
                . "{$this->getPrimaryKeyFieldName()}: {$$guru->getId()}");
        }
    }

    /**
     * This function is being use to find data guru by its id
     * @param type $id
     * @return Object of Guru
     * @throws PDOException if the data is not found
     */
    public function findById($id)
    {
        $sql = "SELECT *FROM guru WHERE id=?";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $found = $statement->rowCount() > 0;
        if ($found) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        } else {
            throw new PDOException("No data {$this->getTableName()} with "
                . "{$this->getPrimaryKeyFieldName()}: {$id}");
        }
    }

    /**
     * This function is being use to save data guru to database sekolahku
     * where the table name is guru
     * @param Guru $guru to be saved
     */
    public function save(Guru $guru)
    {
        $sql = "INSERT INTO guru VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array(
            $guru->getNamaDepan(),
            $guru->getNamaBelakang(),
            $guru->getNoHp(),
            $guru->getEmail(),
            $guru->getTglLahir(),
            $guru->getGender(),
            $guru->getJenjang(),
            $guru->getHobi(),
            $guru->getAlamat(),
        ));
    }

    /**
     * This function is being use to search data guru by the given name
     * @param string $name to be search
     * @return Object of Guru
     */
    public function findByName($name)
    {
        $sql = "SELECT *FROM guru WHERE nama_depan LIKE ? OR nama_belakang LIKE ?";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->execute(array("%{$name}%", "%{$name}%"));
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

}
