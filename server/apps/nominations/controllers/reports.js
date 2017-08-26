// @flow

const Excel = require('exceljs');
const db = require('../../../models');

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AdminRole } from '../../lib/auth';

function headersForExcelFile(name: string): * {
  return {
    'Content-type': 'application/vnd.ms-excel',
    'Content-Disposition': `attachment; filename="${name}.xlsx"`,
    'Cache-Control': 'max-age=0'
  };
}

function flatten(field: string, object: Object): Object {
  const ret = Object.assign({}, object);
  for (const k in object[field]) {
    ret[`${field}_${k}`] = object[field][k];
  }
  return ret;
}

async function export_data_excel(req: UserRequest<AdminRole>, res: Response): Promise<void> {
  const now = new Date().toISOString();
  res.set(headersForExcelFile(`GiftProjectDump_${now}`));

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

async function link_report(req: UserRequest<AdminRole>, res: Response) {
  const now = new Date().toISOString();
  res.set(headersForExcelFile(`GiftProjectTheLinkReport_${now}`));

  const workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: res });

  let worksheet = workbook.addWorksheet('Heads of Household');
  worksheet.columns = [
    { key: 'id', header: 'Family Number', width: 10 },
    { key: 'name_last', header: 'Last Name', width: 15 },
    { key: 'name_first', header: 'First Name', width: 15 },
  ];

  const households = await db.household.findAll({ where: { approved: true } });
  households.forEach(household => worksheet.addRow(household).commit());
  worksheet.commit();


  worksheet = workbook.addWorksheet('Children');
  worksheet.columns = [
    { key: 'household_id', header: 'Family Number', width: 10 },
    { key: 'household_name_full', header: 'Head of Household', width: 10 },
    { key: 'id', header: 'Child Number', width: 10 },
    { key: 'name_first', header: 'Child First Name', width: 10 },
    { key: 'age', header: 'Age', width: 10 },
    { key: 'additional_ideas', header: 'Wish List', width: 10 },
    { key: 'bike_want', header: 'Bike?', width: 10 },
    { key: 'bike_style', header: 'Bike Style', width: 10 },
    { key: 'bike_size', header: 'Bike Size', width: 10 },
    { key: 'clothes_want', header: 'Clothes?', width: 10 },
    { key: 'clothes_size_shirt', header: 'Shirt Size', width: 10 },
    { key: 'clothes_size_pants', header: 'Pants Size', width: 10 },
    { key: 'show_size', header: 'Shoe Size', width: 10 }
  ];

  const children = await db.child.findAll({
    include: [{
      model: db.household,
      as: 'household',
      where: { approved: true },
      required: true
    }]
  });

  children.forEach(child => {
    worksheet.addRow(flatten('household', child.toJSON())).commit();
  });
  worksheet.commit();

  await workbook.commit();
}

async function bike_report(req: UserRequest<AdminRole>, res: Response) {
  const now = new Date().toISOString();
  res.set(headersForExcelFile(`GiftProjectBikeReport_${now}`));

  const workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: res });

  const worksheet = workbook.addWorksheet('Bicycles');
  worksheet.columns = [
    { key: 'household_id', header: 'Family Number', width: 10 },
    { key: 'name_full', header: 'Child Name', width: 15 },
    { key: 'age', header: 'Age', width: 15 },
    { key: 'bike_style', header: 'Bike Style', width: 15 },
    { key: 'bike_size', header: 'Bike Size', width: 15 }
  ];

  const children = await db.child.findAll({
    include: [{
      model: db.household,
      as: 'household',
      where: { approved: true },
      required: true
    }]
  });
  children.forEach(child => worksheet.addRow(flatten('household', child.toJSON())).commit());
  worksheet.commit();
  workbook.commit();
}

/*
    public function division_report() {
        $csv = Export::newCSV(["family number", "head of household",
        "street", "street2", "city", "state", "zip", "phone numbers",
        "email", "division", "response area"]);
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

module.exports = { export_data_excel, link_report, bike_report };
