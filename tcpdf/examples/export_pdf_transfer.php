<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');
    $_POST = json_decode(file_get_contents('php://input'), true);

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
    $pdf->Cell(35, 0, 'ชื่อ-นามสกุล ผู้ขอย้าย', 1, 0, 'L', 0, '', 0);
    $pdf->Cell(50, 0, '', 1, 0, 'L', 0, '', 0);
    $pdf->Ln();


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