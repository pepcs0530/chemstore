<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');

    $fk = $_POST["crd_cr_fk"];
    if(!isset($_POST['type'])){
        $type = '';    
    } 
    else{
        $type = $_POST['type'];
    }
    

    $sql = "SELECT * FROM `chem_receipt_detail`
            INNER JOIN `chem_category`
            ON `crd_cc_fk` = `cc_pk`
            INNER JOIN `chem_location`
            ON `cc_location_fk` = `cl_pk`
            WHERE `crd_cr_fk` = ".$fk." AND crd_status = 4
            ORDER BY `crd_pk` ASC";
    $query = mysql_query($sql);
    

    if($type == '3' || $type == '4'){
        $sql2 = "SELECT * FROM `chem_receipt`
                INNER JOIN `chem_account`
                ON ".$type." = `ca_pk`
                WHERE `cr_pk` = ".$fk."";
    }
    else{
        $sql2 = "SELECT * FROM `chem_receipt`
                INNER JOIN `chem_project`
                ON `cr_cp_fk` = `cp_pk`
                INNER JOIN `chem_account`
                ON `cp_teach_fk` = `ca_pk`
                WHERE `cr_pk` = ".$fk."";
    }
    $query2 = mysql_query($sql2);

    //-------------------------------------------------------------

    // Include the main TCPDF library (search for installation path).
    require_once('tcpdf_include.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Computer Science, KMITL');
    $pdf->SetTitle('แบบฟอร์มเบิกสารเคมี');
    $pdf->SetSubject('แบบฟอร์มเบิกสารเคมี');
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
    $pdf->Text(75,30,"แบบฟอร์มเบิกสารเคมี");

    $pdf->SetFont('freeserif','',12);
    $pdf->Ln(10);
    
    while($row = mysql_fetch_array ($query2))
    {   
        $pdf->Cell(10, 0, 'วันที่', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(30, 0, date('d/m/Y'), 0, 0, 'L', 0, '', 0);
        $pdf->Ln();
        $cr_no = $row['cr_no'];
        $pdf->Cell(20, 0, 'เลขที่ใบเบิก', 0, 0, 'L', 0, '', 0);
        $pdf->Cell(30, 0, $cr_no, 0, 0, 'L', 0, '', 0);
        $pdf->Ln();
        
        if($type != '3' && $type != '4'){
            $pdf->Cell(28, 0, 'อาจารย์ที่ปรึกษา', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(100, 0, $row['ca_tname']." ".$row['ca_fname']." ".$row['ca_lname'], 0, 0, 'L', 0, '', 0);
            $pdf->Ln();

            $sqlStu = "SELECT * FROM `chem_student`
                        WHERE `cs_cp_fk` = ".$row['cr_cp_fk']." ";
            $queryStu = mysql_query($sqlStu);
            $first = 1;
            $data=array();


            while($row = mysql_fetch_array ($queryStu)){
                array_push($data,$row);
                if($first == 1){
                    $pdf->Cell(35, 0, 'ชื่อ-นามสกุล ผู้ขอเบิก', 0, 0, 'L', 0, '', 0);
                    $pdf->Cell(100, 0, ''.$first.'.  '.$row['cs_no'].'   '.$row['cs_name'].' ', 0, 0, 'L', 0, '', 0);
                    $pdf->Ln();
                }else{
                   $pdf->Cell(35, 0, '', 0, 0, 'L', 0, '', 0);
                    $pdf->Cell(100, 0, ''.$first.'.  '.$row['cs_no'].'   '.$row['cs_name'].' ', 0, 0, 'L', 0, '', 0);
                    $pdf->Ln(); 
                }
                $first ++;
            }

            if(count($data) == 0){

                $pdf->Cell(20, 0, 'เลขที่ใบเบิก', 0, 0, 'L', 0, '', 0);
                $pdf->Cell(30, 0, $cr_no, 0, 0, 'L', 0, '', 0);
                $pdf->Ln();
                $pdf->Cell(35, 0, 'ชื่อ-นามสกุล ผู้ขอเบิก', 0, 0, 'L', 0, '', 0);
                $pdf->Cell(100, 0, '1......................................................................................', 0, 0, 'L', 0, '', 0);
                $pdf->Ln(); 
                $pdf->Cell(35, 0, '', 0, 0, 'L', 0, '', 0);
                $pdf->Cell(100, 0, '2......................................................................................', 0, 0, 'L', 0, '', 0);
                $pdf->Ln(); 
                $pdf->Cell(35, 0, '', 0, 0, 'L', 0, '', 0);
                $pdf->Cell(100, 0, '3......................................................................................', 0, 0, 'L', 0, '', 0);
                $pdf->Ln(); 
            }
            $pdf->Cell(53, 0, 'โครงงานพิเศษ/วิทยานิพนธ์ เรื่อง', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(100, 0, $row['cp_name'], 0, 0, 'L', 0, '', 0);
            $pdf->Ln();
            $pdf->Cell(10, 0, 'สาขา', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(42, 0, '[ ] ป.ตรี เคมีอุตสาหกรรม', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(40, 0, '[ ] ป.ตรี เคมีสิ่งแวดล้อม', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(50, 0, '[ ] ป.ตรี เคมีเครื่องมือวิเคราะห์', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(45, 0, '[ ] ปิโตรเคมี(นานาชาติ)', 0, 0, 'L', 0, '', 0);
            $pdf->Ln();
            $pdf->Cell(10, 0, '', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(80, 0, '[ ] ป.โท สาขา...................................................', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(80, 0, '[ ] ป.เอก สาขา...................................................', 0, 0, 'L', 0, '', 0);
        }else{
            $pdf->Cell(10, 0, 'สาขา', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(42, 0, '[ ] ป.ตรี เคมีอุตสาหกรรม', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(40, 0, '[ ] ป.ตรี เคมีสิ่งแวดล้อม', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(50, 0, '[ ] ป.ตรี เคมีเครื่องมือวิเคราะห์', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(45, 0, '[ ] ปิโตรเคมี(นานาชาติ)', 0, 0, 'L', 0, '', 0);
            $pdf->Ln();
            $pdf->Cell(10, 0, '', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(80, 0, '[ ] ป.โท สาขา...................................................', 0, 0, 'L', 0, '', 0);
            $pdf->Cell(80, 0, '[ ] ป.เอก สาขา...................................................', 0, 0, 'L', 0, '', 0);
            $pdf->Ln();
            $pdf->Cell(35, 0, 'ชื่อ-นามสกุล ผู้ขอเบิก 1. '.$row['ca_tname']." ".$row['ca_fname']." ".$row['ca_lname'], 0, 0, 'L', 0, '', 0);
            $pdf->Ln();
            $pdf->Cell(53, 0, 'เหตุผลประกอบการเบิก', 0, 0, 'L', 0, '', 0);     
            $pdf->Ln();
            $pdf->Cell(53, 0, $row['cr_desc'], 0, 0, 'L', 0, '', 0);  
        }
    }

    $pdf->Ln(10);
    $pdf->Cell(20, 0, 'ว/ด/ป', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(15, 0, 'ลำดับที่', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(50, 0, 'สารเคมีที่ต้องการเบิก', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(15, 0, 'จำนวน', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'ราคา/หน่วย', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(25, 0, 'รวมจำนวนเงิน', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'เบิกจาก/ห้อง', 1, 0, 'C', 0, '', 0);
    $pdf->Cell(20, 0, 'หมายเหตุ', 1, 0, 'C', 0, '', 0);
    $pdf->Ln();
    
    $index = 1;
    while($row = mysql_fetch_array ($query))
    {
        $date=date_create($row['crd_crtDt']);
        //date_format($date,"Y/m/d H:i:s");
        $pdf->Cell(20, 0, date_format($date,"d/m/Y"), 1, 0, 'C', 0, '', 0);
        $pdf->Cell(15, 0, $index, 1, 0, 'C', 0, '', 0);
        $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
        $pdf->Cell(15, 0, $row['crd_amt']." ".$row['crd_unit'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, $row['crd_price']." บาท", 1, 0, 'C', 0, '', 0);
        $pdf->Cell(25, 0, $row['crd_price']." บาท", 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0,  strtoupper ($row['cl_name_abb'])." ".$row['cc_room'], 1, 0, 'C', 0, '', 0);
        $pdf->Cell(20, 0, '', 1, 0, 'C', 0, '', 0);
        $pdf->Ln();
        $index++;
    }

    $pdf->Ln();
    $pdf->Ln(); 
    $pdf->Ln();
    $pdf->Cell(90, 0, 'ลงชื่อ..................................................', 0, 0, 'C', 0, '', 0);
    $pdf->Cell(90, 0, 'ลงชื่อ..................................................', 0, 0, 'C', 0, '', 0);
    $pdf->Ln();
    $pdf->Cell(90, 0, '(ผู้รับของ)', 0, 0, 'C', 0, '', 0);
    $pdf->Cell(90, 0, '(เจ้าหน้าที่ผู้จ่ายของ)', 0, 0, 'C', 0, '', 0);

    $pdf->Output('export_pdf_withdraw.pdf', 'I');
//

?>