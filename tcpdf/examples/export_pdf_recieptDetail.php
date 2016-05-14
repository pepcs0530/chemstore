<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');
    $_POST = json_decode(file_get_contents('php://input'), true);

    if (isset($_POST["crd_cr_fk"])) {
        $fk = $_POST["crd_cr_fk"] ;    
    }else{  
        $fk = "" ;  
    }

    $sql = "SELECT * FROM `chem_receipt_detail` 
            WHERE `crd_cr_fk` = 96";
    $query = mysql_query($sql);
    //$data=array();
//    while($row = mysql_fetch_array ($query))
//    {
//        array_push($data,$row);
//    }
//    echo json_encode($data);

    
//print "<meta charset='utf-8'>";
//============================================================+
// File name   : example_001.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 001 for TCPDF class
//               Default Header and Footer
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Default Header and Footer
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Computer Science, KMITL');
$pdf->SetTitle('ใบคำร้องสารเคมี');
$pdf->SetSubject('ใบคำร้องสารเคมี');
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
$pdf->AddPage('P', 'A4');

// set text shadow effect
$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

// Set some content to print
//$html = <<<EOD
//    <h4 align="center">ใบคำร้องสารเคมี</h4>
//    <table width="100%" border="1">
//        <tr>
//            <th>ชื่อสารเคมี</th>
//            <th>จำนวน</th>
//            <th>ราคา</th>
//            <th>หน่วย</th>
//        </tr>
//EOD;
////
//while($row = mysql_fetch_array ($query))
//{
////    
//$pdf->Cell(0, 0, $row['crd_cc_fk'], 1, 1, 'C', 0, '', 0);
////    
//}
//
//$html .= <<<EOD
//    </table>
//EOD;
//
//
//// Print text using writeHTMLCell()
//$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

// ---------------------------------------------------------

//Title
$pdf->SetFont('freeserif','B',18);
$pdf->Text(85,20,"ใบคำร้องสารเคมี");

$pdf->SetFont('freeserif','',16);
//$pdf->SetXY(10,30);
$pdf->Ln(10);
$pdf->Cell(50, 0, 'รายชื่อสาร', 1, 0, 'C', 0, '', 0);
//$pdf->SetXY(40,30);
$pdf->Cell(30, 0, 'จำนวน', 1, 0, 'C', 0, '', 0);
//$pdf->SetXY(70,30);
$pdf->Cell(40, 0, 'ราคา', 1, 0, 'C', 0, '', 0);
$pdf->Cell(40, 0, 'หน่วย', 1, 0, 'C', 0, '', 0);
$pdf->Ln();
while($row = mysql_fetch_array ($query))
{
    $pdf->Cell(50, 0, $row['crd_cc_fk'], 1, 0, 'C', 0, '', 0);
    $pdf->Cell(30, 0, $row['crd_amt'], 1, 0, 'C', 0, '', 0);
    $pdf->Cell(40, 0, $row['crd_price'], 1, 0, 'C', 0, '', 0);
    $pdf->Cell(40, 0, $row['crd_unit'], 1, 0, 'C', 0, '', 0);
    $pdf->Ln();
}
// ---------------------------------------------------------

// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('export_pdf_recieptDetail.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
