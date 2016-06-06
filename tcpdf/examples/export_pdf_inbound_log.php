<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');

    $loc = $_POST['location'];
    $state = $_POST['state'];
    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'] .'+1 day' )) : $edDt = null;


    
    $name = $_POST['name'];   
    $casNo = $_POST['casNo'];   
    $grade = $_POST['grade'];

    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = '';
    

    $sql = "SELECT * FROM `chem_import_log`
    INNER JOIN `chem_category`
    ON `cil_cc_fk` = `cc_pk`
    INNER JOIN `chem_location`
    ON `cc_location_fk` = `cl_pk`
    INNER JOIN `chem_unit`
    ON `cc_unit_fk` = `cu_pk` ";

    if($loc != null || $state != null || $stDt != null || $edDt != null || $name != null || $casNo != null || $grade != null){
        $sql .= "WHERE cil_useflg = '1' ";  
    }

    if($loc != null){
        $sql .= "AND cc_location_fk = '".$loc."' ";    

    }

    if($state != null){
        $sql .= "AND cc_state = '".$state."' ";  

    }

    if($stDt != null && $edDt != null ){
        $sql .= "AND cil_crtDt BETWEEN '".$stDt."' AND '".$edDt."' ";   
    }

    if($name != null){
        $sql .= "AND cc_name LIKE '%".$name."%' ";   
    }

    if($casNo != null){
        $sql .= "AND cc_casNo LIKE '%".$casNo."%' "; 
    }

    if($grade != null){
        $sql .= "AND cc_grade LIKE '%".$grade."%' "; 
    }

    $sql .= "ORDER BY `cil_pk` ASC"; 

    
    if($selectAll == true){
        $sql = "SELECT * FROM `chem_import_log`
            INNER JOIN `chem_category`
            ON `cil_cc_fk` = `cc_pk`
            INNER JOIN `chem_location`
            ON `cc_location_fk` = `cl_pk`
            INNER JOIN `chem_unit`
            ON `cc_unit_fk` = `cu_pk` ";
        $query = mysql_query($sql);
    }else{
        $query = mysql_query($sql);
    }

    // Include the main TCPDF library (search for installation path).
    require_once('tcpdf_include.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Computer Science, KMITL');
    $pdf->SetTitle('ประวัติการนำเข้าสารเคมี');
    $pdf->SetSubject('ประวัติการนำเข้าสารเคมี');
    $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default header data
    //$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'CHEMICAL STORE', 'Chemistry Department, KMITL', array(0,64,255), array(0,64,128));
    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, 'Chemistry Department, KMITL', array(0,64,255),
                        array(0,64,128));
    $pdf->setFooterData(array(0,64,0), array(0,64,128));

    // set header and footer fonts
    $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
    $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
    $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // set image scale factor
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // set some language-dependent strings (optional)
    if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
        require_once(dirname(__FILE__).'/lang/eng.php');
        $pdf->setLanguageArray($l);
    }

    // ---------------------------------------------------------

    // set default font subsetting mode
    $pdf->setFontSubsetting(true);

    // Set font
    // dejavusans is a UTF-8 Unicode font, if you only need to
    // print standard ASCII chars, you can use core fonts like
    // helvetica or times to reduce file size.
    $pdf->SetFont('freeserif', '', 14, '', true);

    // Add a page
    // This method has several options, check the source code documentation for more information.
    //$pdf->AddPage();
    $pdf->AddPage('L', 'A4');

    // set text shadow effect
    $pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

    //Title
    $pdf->SetFont('freeserif','B',16);
    $pdf->Text(120,30,"ประวัติการนำเข้าสารเคมี");
    $pdf->SetFont('freeserif','',12);
    if($selectAll){
        $pdf->Text(210,40,"ประเภทการค้นหา : ดูข้อมูลทั้งหมด");
    }else{
     $pdf->Text(210,40,"ประเภทการค้นหา : ดูข้อมูลตามตัวกรอง");
        $pdf->Text(18,40,"ตั้งแต่วันที่ : ".
                   date("d-m-Y", strtotime($stDt)));
        $pdf->Text(60,40,"ถึงวันที่ : ".
                   date("d-m-Y", strtotime($edDt)));
    }
    $pdf->SetFont('freeserif','',12);
    //$pdf->SetXY(10,30);
    $pdf->Ln(10);
    $pdf->Cell(40, 0, 'วันที่', 1, 0, 'C', 0, '', 0);
    //$pdf->SetXY(40,30);
    $pdf->Cell(60, 0, 'ชื่อสารเคมี', 1, 0, 'C', 0, '', 0);
    //$pdf->SetXY(70,30);
    $pdf->Cell(40, 0, 'Cas no.', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'สถานะ', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(30, 0, 'จำนวนที่นำเข้า', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'หน่วย', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(40, 0, 'คลัง', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'ห้อง', 1, 0, 'C', 0, '', 0);
    $pdf->Ln();
    while($row = mysql_fetch_array ($query))
    {
        $date=date_create($row['cil_crtDt']);
        //date_format($date,"Y/m/d H:i:s");
        $pdf->Cell(40, 0, date_format($date,"d/m/Y"), 1, 0, 'C', 0, '', 0);
        $pdf->Cell(60, 0, $row['cc_name'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(40, 0, $row['cc_casNo'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_state'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(30, 0, $row['cc_quantity'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, strtoupper ($row['cu_name_abb']), 1, 0, 'C', 0, '', 0);
        $pdf->Cell(40, 0, $row['cl_name'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_room'], 1, 0, 'C', 0, '', 0);
        $pdf->Ln();
    }

    $pdf->Output('export_pdf_inbound_log.pdf', 'I');


?>