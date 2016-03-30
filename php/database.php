<?php
    
    class Database{

        // specify your own database credentials 
        private $db_host = "localhost"; 
        private $db_name = "db_chem_lab"; 
        private $db_username = "root"; 
        private $db_password = ""; 
        public $conn; // get the database connection 
        public function getConnection(){ 
            $this->conn = null;

            try{
                $this->conn = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_username, $this->db_password);
            }catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }
            return $this->conn;
    }
}
?>