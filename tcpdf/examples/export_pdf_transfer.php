<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');
    $ce_pk = $_POST['ce_pk'];

    // Include the main TCPDF library (search for installation path).
    require_once('tcpdf_include.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Computer Science, KMITL');
    $pdf->SetTitle('แบบฟอร์มย้ายคลังสารเคมี');
    $pdf->SetSubject('แบบฟอร์มย้ายคลังสารเคมี');
    $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default header data
    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, 'Chemistry Department, KMITL', array(0,64,255), array(0,64,128));
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
    $pdf->AddPage('P', 'A4');

    // set text shadow effect
    $pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

    //Title
    $pdf->SetFont('freeserif','B',16);
    $pdf->Text(75,30,"แบบฟอร์มย้ายคลังสารเคมี");

    $pdf->SetFont('freeserif','',12);
    $pdf->Ln(10);

 

        $sql = "SELECT ce.*,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce
        INNER JOIN `chem_account`
        ON ce_ca_fk = ca_pk
        WHERE ce_pk = '".$ce_pk."'
        ORDER BY ce_crtDt DESC";
    

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query)){
        array_push($data,$row);
        $ce_pk = $row['ce_pk'];
        
        $pdf->Cell(20, 0, 'เลขที่คำร้อง', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, $row['ce_no'], 0, 0, 'L', 0, '', 0);
        $pdf->Ln();
        
        $name = $row['ca_tname'].' '.$row['ca_fname'].' '.$row['ca_lname'];
        $pdf->Cell(35, 0, 'ชื่อ-นามสกุล ผู้ขอย้าย', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, $name, 0, 0, 'L', 0, '', 0);
        $pdf->Ln();

        $date=date_create($row['ce_crtDt']);
        $pdf->Cell(25, 0, 'วันที่ร้องขอ', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, date_format($date,"d/m/Y"), 0, 0, 'L', 0, '', 0);
        $pdf->Ln();

        $pdf->Cell(25, 0, 'คลังที่ย้ายเข้า', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, $row['ce_tostore'], 0, 0, 'L', 0, '', 0);
        $pdf->Ln();

        $pdf->Cell(25, 0, 'หมายเหตุ', 0, 0, 'L', 0, '', 0);
        $pdf->MultiCell(150,15,$row['ce_desc'],0); 
    }

    if(count($data) == 0){
        $pdf->Cell(20, 0, 'เลขที่คำร้อง', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, '', 0, 0, 'L', 0, '', 0);
        $pdf->Ln();
        $pdf->Cell(35, 0, 'ชื่อ-นามสกุล ผู้ขอย้าย', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, '', 0, 0, 'L', 0, '', 0);
        $pdf->Ln();

        $pdf->Cell(25, 0, 'วันที่ร้องขอ', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, '', 0, 0, 'L', 0, '', 0);
        $pdf->Ln();

        $pdf->Cell(25, 0, 'คลังที่ย้ายเข้า', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(50, 0, '', 0, 0, 'L', 0, '', 0);
        $pdf->Ln();

        $pdf->Cell(25, 0, 'หมายเหตุ', 0, 0, 'L', 0, '', 0);
        $pdf->MultiCell(150,15,'',0);
    }

    
    $sql2 = "SELECT ced.*,cc_pk,ced_status,cc_quantity,`cc_name`,`cc_casNo`,`cc_grade`,`ced_amt`,`ced_unit`,`cl_name` 
            FROM `chem_exchange_detail` AS ced 
            INNER JOIN `chem_category` 
            ON `cc_pk` = `ced_cc_fk` 
            INNER JOIN `chem_location` 
            ON cc_location_fk = cl_pk 
            WHERE `ced_ce_fk` = '".$ce_pk."' AND ced_status = '4'";

    $query = mysql_query($sql2);
    $data=array();
    $index = 1;

    
    
    $pdf->Cell(15, 0, 'ลำดับที่', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(50, 0, 'สารเคมีที่ต้องการย้าย', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(25, 0, 'Cas no.', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(15, 0, 'เกรด', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'จำนวนที่ย้าย', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(15, 0, 'หน่วย', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(40, 0, 'คลัง', 1, 0, 'C', 0, '', 0);
    $pdf->Ln();

    while($row = mysql_fetch_array ($query)){
        array_push($data,$row);
        $pdf->Cell(15, 0, $index, 1, 0, 'C', 0, '', 0);
        $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
        $pdf->Cell(25, 0, $row['cc_casNo'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(15, 0, $row['cc_grade'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['ced_amt'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(15, 0, strtoupper ($row['ced_unit']), 1, 0, 'C', 0, '', 0);
        $pdf->Cell(40, 0, $row['cl_name'], 1, 0, 'C', 0, '', 0);
        $pdf->Ln();
        $index++;
    }
    
    if(count($data) == 0){
        $pdf->Cell(15, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(50, 0, '', 1, 0, 'L', 0, '', 0);
        $pdf->Cell(25, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(15, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(15, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Ln();
    }


    


    $pdf->Ln();
    $pdf->Ln(); 
    $pdf->Ln();
    $pdf->Cell(90, 0, 'ลงชื่อ..................................................', 0, 0, 'C', 0, '', 0);
    $pdf->Cell(90, 0, 'ลงชื่อ..................................................', 0, 0, 'C', 0, '', 0);
    $pdf->Ln();
    $pdf->Cell(90, 0, '(ผู้ขอย้าย)', 0, 0, 'C', 0, '', 0);
    $pdf->Cell(90, 0, '(เจ้าหน้าที่ประจำคลัง)', 0, 0, 'C', 0, '', 0);

    $pdf->Output('export_pdf_transfer.pdf', 'I');

?>