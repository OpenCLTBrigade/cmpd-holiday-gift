<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use PHPExcel;
use PHPExcel_Worksheet;
use PHPExcel_Writer_Excel2007;

class Export extends Controller {
  public function export_data_excel(Request $request) {
      header('Content-type: application/vnd.ms-excel');
      header('Content-Disposition: attachment; filename="GiftProjectDump_' . date("YmdHis") . '.xlsx"');
      header('Cache-Control: max-age=0');

      $excel = new PHPExcel();

      $add = function(&$array, $table, $row, $key) {
          if($key == 'password') return;
          $array[] = $row->getAttributeValue($key);
      };

      foreach(['App\Household', 'App\HouseholdAddress', 'App\Child', 'App\HouseholdPhone', 'App\User'] as $model) {
          $table = (new $model)->getTable();
          $sheet = new PHPExcel_Worksheet($excel, $table);
          $columns = \Schema::getColumnListing($table);
          $sheet->fromArray($columns, NULL, 'A1');
          $i = 2;
          foreach($model::all() as $row) {
              $array = array();
              foreach($columns as $key) {
                  $add($array, $table, $row, $key);
              }
              $sheet->fromArray($array, NULL, 'A' . $i++);
          }
          $cells = $sheet->getRowIterator()->current()->getCellIterator();
          $cells->setIterateOnlyExistingCells(true);
          foreach ($cells as $cell) {
              $sheet->getColumnDimension($cell->getColumn())->setAutoSize(true);
          }
          $excel->addSheet($sheet);
      }

      $excel->removeSheetByIndex(0);

      $writer = new PHPExcel_Writer_Excel2007($excel);
      $writer->setOffice2003Compatibility(true);
      $writer->save('php://output');

      // TODO: How else can I tell Laravel to let me write the response?
      flush();
      exit(0);
  }
}
