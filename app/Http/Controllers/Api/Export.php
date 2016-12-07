<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Child;
use App\Household;
use App\HouseholdAddress;

use PHPExcel;
use PHPExcel_Worksheet;
use PHPExcel_Writer_Excel2007;

use League\Csv\Writer;

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
          Export::AutoSizeSheet($sheet);
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

    static function AutoSizeSheet(&$sheet) {
        $cells = $sheet->getRowIterator()->current()->getCellIterator();
        $cells->setIterateOnlyExistingCells(true);
        foreach ($cells as $cell) {
            $sheet->getColumnDimension($cell->getColumn())->setAutoSize(true);
        }
    }

    public function link_report() {
      $excel = new PHPExcel();

      $sheet = new PHPExcel_Worksheet($excel, "Heads of Household");
      $sheet->fromArray(["Family Number", "Last Name", "First Name"], NULL, 'A1');
      $households = Household::all(); // TODO ATN ::where('approved', 1);
      $i=2;
      foreach($households as $h) {
          $sheet->fromArray([$h->id, $h->name_last, $h->name_first], NULL, 'A' . $i++);
      }
      Export::AutoSizeSheet($sheet);
      $excel->addSheet($sheet);

      $sheet = new PHPExcel_Worksheet($excel, "Children");
      $sheet->fromArray(["Family Number", "Head of Household", "Child Number", "Child First Name", "Age", "Wish List", "Bike"], NULL, 'A1');
      $children = Child::all(); // TODO ATN where('household.approved', 1);
      $i=2;
      foreach($children as $c) {
          dd($c->household());
          $sheet->fromArray([$c->household->id, $c->household->name_last . ", " . $c->household->name_first, $c->id, $c->name_first, $c->age /*TODO*/], NULL, 'A' . $i++);
      }
      Export::AutoSizeSheet($sheet);
      $excel->addSheet($sheet);

      $excel->removeSheetByIndex(0);

      header('Content-type: application/vnd.ms-excel');
      header('Content-Disposition: attachment; filename="GiftProjectTheLinkReport_' . date("YmdHis") . '.xlsx"');
      header('Cache-Control: max-age=0');

      $writer = new PHPExcel_Writer_Excel2007($excel);
      $writer->setOffice2003Compatibility(true);
      $writer->save('php://output');

      flush();
      exit(0);
    }

    static function newCSV($headers) {
        $csv = Writer::createFromFileObject(new \SplTempFileObject());
        $csv->insertOne($headers);
        return $csv;
    }

    public function bike_report() {
        $csv = Export::newCSV(["family id", "child name", "age", "bike style", "bike size"]);
        $children = Child::where('bike_want', 'Y')
            ->join('household', 'household.id', '=', 'child.household_id')
            ->where('approved', 1)
            ->get();
        foreach($children as $child) {
            $csv->insertOne([$child->household_id, $child->name_last . ", " . $child->name_first, $child->age, $child->bike_style, $child->bike_size]);
        }
        $csv->output('GiftProjectBikeReport_' . date("YmdHis") . '.csv');

        flush();
        exit(0);
    }

    public function division_report() {
        $csv = Export::newCSV(["family number", "head of household", "street", "street2", "city", "state", "zip", "phone numbers", "email", "division", "response area"]);
        $households = Household::where('approved', 1)->get();

        foreach($households as $h) {
            $a = $h->address->count() ? $h->address[0] : new HouseholdAddress();
            $phones = implode(", ", array_map(function($p){
                        return $p['phone_number'] . " (" . $p['phone_type'] . ")";
                    }, $h->phone->toArray()));
            $csv->insertOne([
                             $h->id,
                             $h->name_last . ", " . $h->name_first,
                             $a->address_street,
                             $a->address_street2,
                             $a->address_city,
                             $a->address_state,
                             $a->address_zip,
                             $phones,
                             $h->email,
                             $a->cmpd_division,
                             $a->cmpd_response_area]);
        }

        $csv->output('GiftProjectDivisionReport_' . date("YmdHis") . '.csv');

        flush();
        exit(0);
    }
}
