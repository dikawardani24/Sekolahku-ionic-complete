<?php

error_reporting(0);

abstract class PDORepository
{

    const DB_NAME = "sekolahku";
    const HOST = "localhost";
    const USER = "root";
    const PASSWORD = "";

    /**
     * This function is being use for fetching all data and delete data
     * from data database
     */
    abstract protected function getTableName();

    /**
     * This function is being use for delete data
     * from data database
     */
    abstract protected function getPrimaryKeyFieldName();

    /**
     * This function is for acquiring connection to database
     * @return \PDO
     */
    protected function getConnection()
    {
        $db = self::DB_NAME;
        $host = self::HOST;
        $username = self::USER;
        $password = self::PASSWORD;

        $connection = new PDO("mysql:dbname=$db;host=$host", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    }

    /**
     * This function is being used to fetch all data 
     * @return list of data
     */
    public function fetchAll()
    {
        $connection = $this->getConnection();
        $sql = "SELECT *FROM {$this->getTableName()}";
        $statement = $connection->prepare($sql);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * This function is being used to delete data from database 
     * @param type $primaryKey the data id to be deleted
     * @throws PDOException if no data is found by matching the given id
     */
    public function delete($primaryKey)
    {
        $sql = "DELETE FROM {$this->getTableName()} WHERE "
            . "{$this->getPrimaryKeyFieldName()}=:primary_value";
        $connection = $this->getConnection();
        $statement = $connection->prepare($sql);

        $statement->bindParam(":primary_value", $primaryKey);
        $statement->execute();

        $deleted = $statement->rowCount() > 0;
        if (!$deleted) {
            throw new PDOException("No data {$this->getTableName()} with "
                . "{$this->getPrimaryKeyFieldName()}: {$primaryKey}");
        }
    }

}
