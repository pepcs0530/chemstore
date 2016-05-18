<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');
    $_POST = json_decode(file_get_contents('php://input'), true);


    $sql = "SELECT * FROM `chem_category`
            INNER JOIN `chem_unit`
            ON `cc_unit_fk` = `cu_pk`
            INNER JOIN `chem_location`
            ON `cc_location_fk` = `cl_pk`";
    $query = mysql_query($sql);

    // Include the main TCPDF library (search for installation path).
    require_once('tcpdf_include.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Computer Science, KMITL');
    $pdf->SetTitle('รายงานสถานะคลังล่าสุด');
    $pdf->SetSubject('รายงานสถานะคลังล่าสุด');
    $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default header data
    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'CHEMICAL STORE', 'Chemistry Department, KMITL', array(0,64,255), array(0,64,128));
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
    $pdf->Text(120,30,"รายงานสถานะคลังล่าสุด");

    $pdf->SetFont('freeserif','',12);
    //$pdf->SetXY(10,30);
    $pdf->Ln(10);
    $pdf->Cell(60, 0, 'ชื่อสารเคมี', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(30, 0, 'Cas no.', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'สถานะ', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'ขนาดบรรจุ', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'ปริมาณ', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'จำนวน', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'สถานที่', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'ห้อง', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(30, 0, 'ราคาต่อหน่วย', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'เกรด', 1, 0, 'C', 0, '', 0); 
    $pdf->Ln();
    while($row = mysql_fetch_array ($query)){
        $pdf->Cell(60, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
        $pdf->Cell(30, 0, $row['cc_casNo'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_state'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_packing']." ".$row['cu_name_abb'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_volume']." ".$row['cu_name_abb'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_quantity'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cl_name'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_room'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(30, 0, $row['cc_price'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['cc_grade'], 1, 0, 'C', 0, '', 0); 
        $pdf->Ln();
    }


    $pdf->Output('export_pdf_chem_remain.pdf', 'I');

?>