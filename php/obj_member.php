<?php
class Member{
      
    // database connection and table name
    private $conn;
    private $table_name = "chem_account";
      
    // object properties
    public $code;
    public $user; //
    public $pass;
    public $tname; //
    public $fname;
    public $lname;
    public $tel;
    public $acctyp;
      
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    // create member
    function create(){

        // query to insert record
        $query = "INSERT INTO 
                    " . $this->table_name . "
                SET 
                    ca_code=:code, 
                    ca_user=:user, 
                    ca_pass=:pass, 
                    ca_tname=:tname, 
                    ca_fname=:fname, 
                    ca_lname=:lname, 
                    ca_tel=:tel,
                    ca_cat_fk=:acctyp,
                    ca_useflg='1', 
                    ca_crtDt=CURRENT_TIMESTAMP";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // posted values
        $this->code=htmlspecialchars(strip_tags($this->code));
        $this->user=htmlspecialchars(strip_tags($this->user));
        $this->pass=htmlspecialchars(strip_tags($this->pass));
        $this->tname=htmlspecialchars(strip_tags($this->tname));
        $this->fname=htmlspecialchars(strip_tags($this->fname));
        $this->lname=htmlspecialchars(strip_tags($this->lname));
        $this->tel=htmlspecialchars(strip_tags($this->tel));
        $this->acctyp=htmlspecialchars(strip_tags($this->acctyp));
        //$this->desc=htmlspecialchars(strip_tags($this->desc));
        //$this->useflg=htmlspecialchars(strip_tags($this->useflg));

        // bind values
        $stmt->bindParam(":code", $this->code);
        $stmt->bindParam(":user", $this->user);
        $stmt->bindParam(":pass", $this->pass);
        $stmt->bindParam(":tname", $this->tname);
        $stmt->bindParam(":fname", $this->fname);
        $stmt->bindParam(":lname", $this->lname);
        $stmt->bindParam(":tel", $this->tel);
        $stmt->bindParam(":acctyp", $this->acctyp);
        //$stmt->bindParam(":useflg", $this->useflg);
        //$stmt->bindParam(":created", $this->created);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            echo "<pre>";
                print_r($stmt->errorInfo());
            echo "</pre>";

            return false;
        }
    }
}

?>