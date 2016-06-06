<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');

    isset($_POST['no']) ? $no = $_POST['no'] : $no = '';
    isset($_POST['tostore']) ? $tostore = $_POST['tostore'] : $tostore = '';
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;
    $stDt= $_POST['stDt'];
    $edDt= $_POST['edDt'];

    $sql = "SELECT ce.*,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce ";
    $sql .= "INNER JOIN chem_account ON ce_ca_fk = ca_pk";

    if($selectAll != 'true'){
        $sql .= " WHERE `ce_crtDt` BETWEEN '".substr($stDt,1,strlen($stDt)-2)."' AND '".substr($edDt,1,strlen($edDt)-2)."' ";
    }

    if($no != '' && $selectAll != 'true'){
        $sql .= " AND ce_no LIKE '%".$no."%' ";
    }
    
    if($tostore != '' && $selectAll != 'true'){
        $sql .= " AND ce_tostore LIKE '%".$tostore."%' ";
    }

    $sql .= " ORDER BY ce_crtDt DESC";

    $query = mysql_query($sql); 
     //Include the main TCPDF library (search for installation path).
    require_once('tcpdf_include.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Computer Science, KMITL');
    $pdf->SetTitle('ประวัติการย้ายคลังสารเคมี');
    $pdf->SetSubject('ประวัติการย้ายคลังสารเคมี');
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

    $pdf->SetFont('freeserif','B',16);
    $pdf->Text(120,30,"ประวัติการย้ายคลังสารเคมี");
    $pdf->SetFont('freeserif','',12);

    if($selectAll == 'true'){
        $pdf->Text(210,40,"ประเภทการค้นหา : ดูข้อมูลทั้งหมด");
    }
    else{
        $pdf->Text(18,40,"ตั้งแต่วันที่ : ".
               date("d-m-Y", strtotime(substr($stDt,1,strlen($stDt)-2)))  );
        $pdf->Text(60,40,"ถึงวันที่ : ".
               date("d-m-Y", strtotime(substr($edDt,1,strlen($edDt)-2)))  );
        $pdf->Text(210,40,"ประเภทการค้นหา : ดูข้อมูลตามตัวกรอง");
        if($no != '' && $selectAll != 'true'){
            $pdf->Text(100,40,"เลขที่ใบเสร็จ : ".$no);
        }
        if($tostore != '' && $selectAll != 'true'){
            $pdf->Text(18,50,"คลังที่ย้ายสารเข้า : ".$tostore);
        }
    }
    $pdf->Ln(10);

    $pdf->SetFont('freeserif','',12);

    $pdf->SetFont('freeserif','',10);
    $first = 1;
    $index = 1;

    while($row = mysql_fetch_array ($query))
    {
        if($first==1){

            $pdf->Cell(25, 0, 'วันที่เขียนคำร้อง', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(25, 0, 'วันที่ได้รับอนุมัติ', 1, 0, 'C', 0, '', 0);

            $pdf->Cell(27, 0, 'เลขที่ใบเบิก', 1, 0, 'C', 0, '', 0);

            $pdf->Cell(45, 0, 'อาจารย์ที่ปรึกษา', 1, 0, 'C', 0, '', 0);

            $pdf->Cell(50, 0, 'ชื่อสารเคมี', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(40, 0, 'Cas no.', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(20, 0, 'เกรด', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(15, 0, 'จำนวน', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(15, 0, 'หน่วย', 1, 0, 'C', 0, '', 0);
            $first++;
            $pdf->Ln();
        }
        
        $date_crt = date_create($row['ce_crtDt']);
        $date_upd = date_create($row['ce_updDt']);
        $cr_no = $row['ce_no'];
        $name = $row['ca_tname']." ".$row['ca_fname']." ".$row['ca_lname'];
        
        
        $find = $row['ce_pk'];
        
        
        $sql2 = "SELECT cc_pk,ced_status,`cc_name`,`cc_casNo`,`cc_grade`,`ced_amt`,`ced_unit`,`cl_name`
           FROM `chem_exchange_detail`
           INNER JOIN `chem_category`
           ON `cc_pk` = `ced_cc_fk`
           INNER JOIN `chem_location`
           ON cc_location_fk = cl_pk
           WHERE `ced_ce_fk` = ".$find;
        
        $query2 = mysql_query($sql2);
        $data=array();
            
        while($row = mysql_fetch_array ($query2))
        {
            array_push($data,$row);
            if($index==1){
                $pdf->Cell(25, 0, date_format($date_crt,"d/m/Y"), 1, 0, 'L', 0, '', 0);
                $pdf->Cell(25, 0, date_format($date_upd,"d/m/Y"), 1, 0, 'L', 0, '', 0);
                $pdf->Cell(27, 0, $cr_no, 1, 0, 'C', 0, '', 0);
                $pdf->Cell(45, 0, $name, 1, 0, 'L', 0, '', 0);
                $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(40, 0, $row['cc_casNo'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(20, 0, $row['cc_grade'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(15, 0, $row['ced_amt'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(15, 0, strtoupper ($row['ced_unit']), 1, 0, 'C', 0, '', 0);
                $pdf->Ln(); 
                
            }else{
                $pdf->Cell(25, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(25, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(27, 0, '', 1, 0, 'C', 0, '', 0);
                $pdf->Cell(45, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(40, 0, $row['cc_casNo'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(20, 0, $row['cc_grade'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(15, 0, $row['ced_amt'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(15, 0,   strtoupper ($row['ced_unit']), 1, 0, 'C', 0, '', 0);
                $pdf->Ln(); 
            }
            $index++;
        }
        
        if(count($data) == 0){
            $pdf->Cell(25, 0, date_format($date_crt,"d/m/Y"), 1, 0, 'L', 0, '', 0);
            $pdf->Cell(25, 0, date_format($date_upd,"d/m/Y"), 1, 0, 'L', 0, '', 0);
            $pdf->Cell(27, 0, $cr_no, 1, 0, 'C', 0, '', 0);
            $pdf->Cell(45, 0, $name, 1, 0, 'L', 0, '', 0);
            $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
            $pdf->Cell(40, 0, $row['cc_casNo'], 1, 0, 'L', 0, '', 0);
            $pdf->Cell(20, 0, $row['cc_grade'], 1, 0, 'L', 0, '', 0);
            $pdf->Cell(15, 0, $row['ced_amt'], 1, 0, 'C', 0, '', 0);
            $pdf->Cell(15, 0, $row['ced_unit'], 1, 0, 'C', 0, '', 0);
            $pdf->Ln(); 
        }
        
        $index=1;
        //$pdf->Ln();
    }

    $pdf->Output('export_pdf_transfer_log.pdf', 'I');
?>