<?php
    include '../../php/connect.php';
    date_default_timezone_set('Asia/Bangkok');
    //$_POST = json_decode(file_get_contents('php://input'), true);

    $findthis = $_POST['findthis'];
    $findtypethis = $_POST['findtypethis'];
//    $findthis = 1;
//    $findtypethis = 1;

    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'] .'+1 day' )) : $edDt = null;
    isset($_POST['no']) ? $no = $_POST['no'] : $no = null;
    isset($_POST['project']) ? $project = $_POST['project'] : $project = null;
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;

//    if($findtypethis == 1){
//            $sql = "SELECT `cr_pk`,`cr_no`,`ca_user`,`ca_tname`,`ca_fname`,`ca_lname`,`cp_name`,`cp_teach_fk`,`cr_crtDt`,`cr_updDt` ".
//            "FROM `chem_receipt` ".
//            "INNER JOIN `chem_project` ".
//            "ON `cr_cp_fk` = `cp_pk` ".
//            "INNER JOIN `chem_account` ".
//            "ON cp_teach_fk = `ca_pk` ".
//            "ORDER BY `cr_crtDt` DESC";
//        if($selectAll == true){
//            $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
//                "FROM chem_receipt AS cr ".
//                "INNER JOIN chem_project AS cp ".
//                "ON cp_pk = cr_cp_fk ".
//                "INNER JOIN chem_account AS ca ".
//                "ON cp_teach_fk = ca_pk ".
//                "WHERE cr_type = 'chemrequest' ".
//                "ORDER BY cr_crtDt DESC";
//        }else{
//            $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
//                "FROM chem_receipt AS cr ".
//                "INNER JOIN chem_project AS cp ".
//                "ON cp_pk = cr_cp_fk ".
//                "INNER JOIN chem_account AS ca ".
//                "ON cp_teach_fk = ca_pk ".
//                "WHERE cr_type = 'chemrequest' ";
//            
//            if($stDt != null && $edDt != null ){
//                $sql .= "AND cr.cr_updDt BETWEEN '".$stDt."' AND '".$edDt."' ";
//            }
//            
//            if($no != null){
//                $sql .= "AND cr.cr_no LIKE '%".$no."%' ";
//            }
//            
//            if($project != null){
//                $sql .= "AND cp.cp_name LIKE '%".$project."%' ";
//            }
//            
//            $sql .= "ORDER BY cr_crtDt DESC";
//        }
//        
//    }else{
////        $sql = "SELECT `cr_pk`,`cr_no`,`ca_user`,`ca_tname`,`ca_fname`,`ca_lname`,`cp_name`,`cp_teach_fk`,`cr_crtDt`,`cr_updDt` ".
////            "FROM `chem_receipt` ".
////            "INNER JOIN `chem_project` ".
////            "ON `cr_cp_fk` = `cp_pk` ".
////            "INNER JOIN `chem_account` ".
////            "ON cp_teach_fk = `ca_pk` ".
////            "WHERE cr_no LIKE 'NO.".$findthis."%' ".
////            "ORDER BY `cr_crtDt` DESC";
//        $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
//                "FROM chem_receipt AS cr ".
//                "INNER JOIN chem_project AS cp ".
//                "ON cp_pk = cr_cp_fk ".
//                "INNER JOIN chem_account AS ca ".
//                "ON cp_teach_fk = ca_pk ".
//                "WHERE cr_type = 'chemrequest' AND cr_no like 'NO.".$findthis."%'".
//                "ORDER BY cr_crtDt DESC";
//    }

    if($findtypethis == 1){
        $sql = "SELECT cr.*,cp_pk,cp_name,cp_eduLvl,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr ";
        $sql .= "INNER JOIN chem_project ON cp_pk = cr_cp_fk ";
        $sql .= "INNER JOIN chem_account ON cp_teach_fk = ca_pk ";
        $sql .= "WHERE `cr_crtDt` BETWEEN '".$stDt."' AND '".$edDt."'";
    }else{
        $sql = "SELECT cr.*,cp_pk,cp_name,cp_eduLvl,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr ";
        $sql .= "INNER JOIN chem_project ON cp_pk = cr_cp_fk ";
        $sql .= "INNER JOIN chem_account ON cp_teach_fk = ca_pk ";
        $sql .= "WHERE `cr_crtDt` BETWEEN '".$stDt."' AND '".$edDt."' ";
        $sql .= "AND cr_no LIKE 'NO.".$findthis."%' ";
    }

    if($no != null){
        $sql .= " AND cr_no LIKE '%".$no."%' ";
    }
    if($project != null){
        $sql .= " AND cp_name LIKE '%".$project."%' ";
    }
    
    $sql .= "ORDER BY cr_crtDt DESC";


    $query = mysql_query($sql);

    
    // Include the main TCPDF library (search for installation path).
    require_once('tcpdf_include.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Computer Science, KMITL');
    $pdf->SetTitle('ประวัติการเบิกสารเคมี');
    $pdf->SetSubject('ประวัติการเบิกสารเคมี');
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
    $pdf->Text(120,30,"ประวัติการเบิกสารเคมี");
    $pdf->Ln(10);

    $pdf->SetFont('freeserif','',12);

//    while($row = mysql_fetch_array ($query))
//    {
//        $date_crt = date_create($row['cr_crtDt']);
//        $date_upd = date_create($row['cr_updDt']);
//        
//        
//        
//        $pdf->Cell(50, 0, 'วันที่เขียนคำร้อง :', 0, 0, 'R', 0, '', 0);
//        $pdf->Cell(50, 0, date_format($date_crt,"d/m/Y"), 0, 0, 'L', 0, '', 0);
//        $pdf->Ln();
//        $pdf->Cell(50, 0, 'วันที่ได้รับอนุมัติ :', 0, 0, 'R', 0, '', 0);
//        $pdf->Cell(50, 0, date_format($date_upd,"d/m/Y"), 0, 0, 'L', 0, '', 0);
//        $pdf->Ln();
//        $pdf->Cell(50, 0, 'เลขที่ใบเบิก :', 0, 0, 'R', 0, '', 0);
//        $pdf->Cell(50, 0, $row['cr_no'], 0, 0, 'L', 0, '', 0);
//        $pdf->Ln();
//        $pdf->Cell(50, 0, 'อาจารย์ที่ปรึกษา :', 0, 0, 'R', 0, '', 0);
//        $pdf->Cell(50, 0, $row['ca_tname']." ".$row['ca_fname']." ".$row['ca_lname'], 0, 0, 'L', 0, '', 0);
//        $pdf->Ln();
//        $pdf->Cell(50, 0, 'โครงงานพิเศษ/วิทยานิพนธ์ :', 0, 0, 'R', 0, '', 0);
//        $pdf->Cell(50, 0, $row['cp_name'], 0, 0, 'L', 0, '', 0);
//        $pdf->Ln();
//        
//        
//        $find = $row['cr_pk'];
//        
//        $sql2 = "SELECT `cc_name`,`crd_amt`,`crd_price`,`crd_unit`,`cl_name`".
//           "FROM `chem_receipt_detail`".
//           "INNER JOIN `chem_category`".
//           "ON `cc_pk` = `crd_cc_fk`".
//           "INNER JOIN chem_location ".
//           "ON cc_location_fk = cl_pk ".
//           "WHERE `crd_cr_fk` = ".$find;
//        $query2 = mysql_query($sql2);
//        
//        $pdf->Cell(50, 0, 'ชื่อสารเคมี', 1, 0, 'C', 0, '', 0);
//        $pdf->Cell(15, 0, 'จำนวน', 1, 0, 'C', 0, '', 0);
//        $pdf->Cell(15, 0, 'หน่วย', 1, 0, 'C', 0, '', 0);
//        $pdf->Cell(30, 0, 'คลัง', 1, 0, 'C', 0, '', 0);
//        $pdf->Cell(20, 0, 'ราคา', 1, 0, 'C', 0, '', 0);
//        $pdf->Ln();
//        
//        while($row = mysql_fetch_array ($query2))
//        {
//            $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'C', 0, '', 0);
//            $pdf->Cell(15, 0, $row['crd_amt'], 1, 0, 'C', 0, '', 0);
//            $pdf->Cell(15, 0, $row['crd_unit'], 1, 0, 'C', 0, '', 0);
//            $pdf->Cell(30, 0, $row['cl_name'], 1, 0, 'C', 0, '', 0);
//            $pdf->Cell(20, 0, $row['crd_price'], 1, 0, 'C', 0, '', 0);
//            $pdf->Ln();
//        }
//        
//        $pdf->Ln();
//    }

    $pdf->SetFont('freeserif','',10);
    $first = 1;
    $index = 1;

    while($row = mysql_fetch_array ($query))
    {
        if($first==1){
//            $date_crt = date_create($row['cr_crtDt']);
//            $date_upd = date_create($row['cr_updDt']);

            $pdf->Cell(25, 0, 'วันที่เขียนคำร้อง', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(25, 0, 'วันที่ได้รับอนุมัติ', 1, 0, 'C', 0, '', 0);

            $pdf->Cell(27, 0, 'เลขที่ใบเบิก', 1, 0, 'C', 0, '', 0);
//            $cr_no = $row['cr_no'];

            $pdf->Cell(45, 0, 'อาจารย์ที่ปรึกษา', 1, 0, 'C', 0, '', 0);
//            $name = $row['ca_tname']." ".$row['ca_fname']." ".$row['ca_lname'];

            $pdf->Cell(40, 0, 'โครงงานพิเศษ/วิทยานิพนธ์', 1, 0, 'C', 0, '', 0);
//            $project = $row['cp_name'];

            $pdf->Cell(50, 0, 'ชื่อสารเคมี', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(15, 0, 'จำนวน', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(15, 0, 'หน่วย', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(10, 0, 'คลัง', 1, 0, 'C', 0, '', 0);
            $pdf->Cell(15, 0, 'ราคา', 1, 0, 'C', 0, '', 0);
            $first++;
        }
        
        $date_crt = date_create($row['cr_crtDt']);
        $date_upd = date_create($row['cr_updDt']);
        $cr_no = $row['cr_no'];
        $name = $row['ca_tname']." ".$row['ca_fname']." ".$row['ca_lname'];
        $project = $row['cp_name'];
        
        $pdf->Ln();
        
        $find = $row['cr_pk'];
        
        
        $sql2 = "SELECT `cc_name`,`crd_amt`,`crd_price`,`crd_unit`,`cl_name`,`cl_name_abb`".
           "FROM `chem_receipt_detail`".
           "INNER JOIN `chem_category`".
           "ON `cc_pk` = `crd_cc_fk`".
           "INNER JOIN chem_location ".
           "ON cc_location_fk = cl_pk ".
           "WHERE `crd_cr_fk` = ".$find;
        $query2 = mysql_query($sql2);
            
        while($row = mysql_fetch_array ($query2))
        {
            if($index==1){
                $pdf->Cell(25, 0, date_format($date_crt,"d/m/Y"), 1, 0, 'L', 0, '', 0);
                $pdf->Cell(25, 0, date_format($date_upd,"d/m/Y"), 1, 0, 'L', 0, '', 0);
                $pdf->Cell(27, 0, $cr_no, 1, 0, 'L', 0, '', 0);
                $pdf->Cell(45, 0, $name, 1, 0, 'L', 0, '', 0);
                $pdf->Cell(40, 0, $project, 1, 0, 'L', 0, '', 0);
                $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(15, 0, $row['crd_amt'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(15, 0, $row['crd_unit'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(10, 0, $row['cl_name_abb'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(15, 0, $row['crd_price'], 1, 0, 'C', 0, '', 0);
                
            }else{
                $pdf->Cell(25, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(25, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(27, 0, '', 1, 0, 'C', 0, '', 0);
                $pdf->Cell(45, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(40, 0, '', 1, 0, 'L', 0, '', 0);
                $pdf->Cell(50, 0, $row['cc_name'], 1, 0, 'L', 0, '', 0);
                $pdf->Cell(15, 0, $row['crd_amt'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(15, 0, $row['crd_unit'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(10, 0, $row['cl_name_abb'], 1, 0, 'C', 0, '', 0);
                $pdf->Cell(15, 0, $row['crd_price'], 1, 0, 'C', 0, '', 0);
            }
            
            
            $index++;
            $pdf->Ln(); 
        }
        
        $index=1;
        //$pdf->Ln();
    }

    $pdf->Output('export_pdf_withdraw_log.pdf', 'I');
    
    
?>