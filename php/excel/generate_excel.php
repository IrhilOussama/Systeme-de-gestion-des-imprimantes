<?php
header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

require '../../vendor/autoload.php'; // Adjust path as needed
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

require "../model/model.php";
$conn = Model::dataBase();
$stmt = $conn->query('SELECT id, modele, marque, ip, stock, (SELECT titre FROM departements WHERE id = departement) as departement_titre FROM imprimantes');
$imprimantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
$spreadsheet = new Spreadsheet();
$mySheet = $spreadsheet->getActiveSheet();
$mySheet->setCellValue("A1", "ID");
$mySheet->setCellValue("B1", "Modele");
$mySheet->setCellValue("C1", "Marque");
$mySheet->setCellValue("D1", "Adresse Ip");
$mySheet->setCellValue("E1", "Departement");
$mySheet->setCellValue("F1", "Stock");
$row = 2;
foreach($imprimantes as $imp){
    $mySheet->setCellValue("A" . $row, $imp['id']);
    $mySheet->setCellValue("B" . $row, $imp['modele']);
    $mySheet->setCellValue("C" . $row, $imp['marque']);
    $mySheet->setCellValue("D" . $row, $imp['ip']);
    $mySheet->setCellValue("E" . $row, $imp['departement_titre']);
    $mySheet->setCellValue("F" . $row, $imp['stock']);
    $row++;
} 
// whene the spreadheet is ready
$writer = IOFactory::createWriter($spreadsheet, "Xlsx");
// header("Content-Disposition: attachment; filename=imprimantes.xlsx");
// header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;");
// header("Cache-Control: max-age=0");
$writer->save("imprimantes_data.xlsx");
exit();
?>