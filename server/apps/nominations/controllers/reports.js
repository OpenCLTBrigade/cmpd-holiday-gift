// @flow

const Excel = require('exceljs');
const db = require('../../../models');

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AdminRole } from '../../lib/auth';

async function export_data_excel(req: UserRequest<AdminRole>, res: Response): Promise<void> {
  const now = new Date().toISOString();
  res.set({
    'Content-type': 'application/vnd.ms-excel',
    'Content-Disposition': `attachment; filename="GiftProjectDump_${now}.xlsx"`,
    'Cache-Control': 'max-age=0'
  });

  const workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: res });

  const columnSpecs = {
    household: {},
    household_address: {},
    household_phone: {},
    user: { id: { width: 3 } }
  };

  for (const table in columnSpecs) {
    const data = await db[table].findAll();
    const worksheet = workbook.addWorksheet(table);
    const cols = [];
    for (const col of Object.getOwnPropertyNames(columnSpecs[table])) {
      if (columnSpecs[table][col] !== false) {
        cols.push(Object.assign({}, { key: col, header: col, width: 5 }, columnSpecs[table][col]));
      }
    }
    if (data[0]) {
      for (const col in data[0].toJSON()) {
        if (!(col in columnSpecs[table])) {
          cols.push({ key: col, header: col, width: 5 });
        }
      }
    }
    worksheet.columns = cols;
    data.forEach(row => worksheet.addRow(row.toJSON()).commit());
    worksheet.commit();
  }
  await workbook.commit();
}

/*
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
      $sheet->fromArray([
        "Family Number",
        "Head of Household",
        "Child Number",
        "Child First Name",
        "Age",
        "Wish List",
        "Bike?",
        "Bike Style",
        "Bike Size",
        "Clothes?",
        "Shirt Size",
        "Pants Size",
        "Shoe Size",

      ], NULL, 'A1');
      $children = Child::join('household', 'household.id', '=', 'child.household_id')
          ->where('household.deleted_at')
          ->select('child.*')
          ->get();
      $i=2;
      foreach($children as $c) {
          if (!$c->household)
            continue;

          $sheet->fromArray([
            $c->household_id,
            $c->household->name_last . ", " . $c->household->name_first,
            $c->id,
            $c->name_first,
            $c->age,
            $c->additional_ideas,
            ($c->bike_want == "Y") ? "Yes" : "",
            ($c->bike_want == "Y") ? $c->bike_style : "",
            ($c->bike_want == "Y") ? $c->bike_size : "",
            ($c->clothes_want == "Y") ? "Yes" : "",
            $c->clothes_size_shirt,
            $c->clothes_size_pants,
            $c->shoe_size,
          ], NULL, 'A' . $i++);
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
*/

module.exports = { export_data_excel };
