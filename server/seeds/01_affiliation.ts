import { Connection } from 'typeorm';

import { Affiliation } from '../entities'


/*eslint no-console: "off", max-lines: "off" */

const cmpdStations = [
    {
      'name': 'Eastway',
      'captain': 'Jim Wright',
      'street': '3024 Eastway Dr.',
      'phone': '704-336-8535',
      'area': 'Northeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28205'
    },
  
    {
      'name': 'HQ',
      'street': '601 E Trade St',
      'phone': '',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28202'
    },
    {
      'name': 'Matthews',
      'street': '1201 Crews Rd',
      'phone': '',
      'state': 'NC',
      'city': 'Matthews',
      'zip': '28105'
    },
    {
      'name': 'Huntersville',
      'street': '9630 Julian Clark Ave',
      'phone': '',
      'state': 'NC',
      'city': 'Huntersville',
      'zip': '28078'
    },
    {
      'name': 'Mint Hill',
      'street': '7151 Matthews-Mint Hill Rd',
      'phone': '',
      'state': 'NC',
      'city': 'Mint Hill',
      'zip': '28227'
    },
    {
      'name': 'Cornelius',
      'street': '21440 Catawba Ave',
      'phone': '',
      'state': 'NC',
      'city': 'Cornelius',
      'zip': '28031'
    },
    {
      'name': 'Davidson',
      'street': 'S Main St',
      'phone': '',
      'state': 'NC',
      'city': 'Davidson',
      'zip': '28036'
    },
    {
      'name': 'Pineville',
      'street': '427 Main St',
      'phone': '',
      'state': 'NC',
      'city': 'Pineville',
      'zip': '28134'
    },
    {
      'name': 'North Tryon',
      'captain': 'Rob Dance',
      'street': '4045 N. Tryon St. Suite B',
      'phone': '704-336-8398',
      'area': 'Northeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28206'
    },
    {
      'name': 'University City',
      'captain': 'Brian Foley',
      'street': '8401-120 University Executive Park Dr.',
      'phone': '704-432-3900',
      'area': 'Northeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28262'
    },
    {
      'name': 'Freedom',
      'captain': 'Michelle Hummel',
      'street': '4150 Wilkinson Blvd.',
      'phone': '704-432-6795',
      'area': 'Northwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    },
    {
      'name': 'Metro',
      'captain': 'Jonathan Thomas',
      'street': '1118 Beatties Ford Rd.',
      'phone': '704-336-8300',
      'area': 'Northwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28216'
    },
    {
      'name': 'North',
      'captain': 'Ryan Butler',
      'street': '10430-R Harris Oaks Blvd.',
      'phone': '704-432-3801',
      'area': 'Northwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28269'
    },
    {
      'name': 'Airport',
      'captain': 'Gregg Collins',
      'street': '1770 Shopton Rd.',
      'phone': '704-336-2328',
      'area': 'Northwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28217'
    },
    {
      'name': 'Hickory Grove',
      'captain': 'Chuck Henson',
      'street': '5727-A N. Sharon Amity Rd.',
      'phone': '704-567-9198',
      'area': 'Southeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28215'
    },
    {
      'name': 'Independence',
      'captain': 'Nelson Bowling',
      'street': '9315-G Monroe Rd.',
      'phone': '704-841-1477',
      'area': 'Southeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28270'
    },
    {
      'name': 'Providence',
      'captain': 'Norman Garnes Jr.',
      'street': '715 N. Wendover Rd.',
      'phone': '704-336-2878',
      'area': 'Southeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28211'
    },
    {
      'name': 'South',
      'captain': 'Todd Lontz',
      'street': '8050 Corporate Center Dr., Suite 100',
      'phone': '704-544-4835',
      'area': 'Southeast',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28226'
    },
    {
      'name': 'Central',
      'captain': 'Mike Campagna',
      'street': '119 E. Sevent St., Suite 2B',
      'phone': '704-336-5729',
      'area': 'Southwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28202'
    },
    {
      'name': 'Steele Creek',
      'captain': 'Chris Dozier',
      'street': '2227 Westinghouse Blvd.',
      'phone': '704-336-7800',
      'area': 'Southwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28273'
    },
    {
      'name': 'Westover',
      'captain': 'Tonya Arrington',
      'street': '1540 West Blvd.',
      'phone': '704-432-2442',
      'area': 'Southwest',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    }
  ];
  
  const cfdStations = [
    {
      'name': 'Station 1',
      'street': '221 N. Myers St.',
      'phone': '704-336-2150',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28202'
    },
    {
      'name': 'Station 2',
      'street': '1817 South Blvd',
      'phone': '704-336-2580',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28203'
    },
    {
      'name': 'Station 3',
      'street': '6512 Monroe Rd',
      'phone': '704-568-4141',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28212'
    },
    {
      'name': 'Station 4',
      'street': '525 N. Church St',
      'phone': '704-336-4409',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28202'
    },
    {
      'name': 'Station 5',
      'street': '224 Wesley Heights Way',
      'phone': '704-336-2499',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    },
    {
      'name': 'Station 6',
      'street': '249 S. Laurel Ave.',
      'phone': '704-336-2668',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28207'
    },
    {
      'name': 'Station 7',
      'street': '3210 North Davidson St',
      'phone': '704-336-2851',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28205'
    },
    {
      'name': 'Station 8',
      'street': '1201 The Plaza',
      'phone': '704-336-2152',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28205'
    },
    {
      'name': 'Station 9',
      'street': '4526 McKee Rd',
      'phone': '704-432-6874',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28105'
    },
    {
      'name': 'Station 10',
      'street': '2810 Wilkinson Blvd',
      'phone': '704-399-2206',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    },
    {
      'name': 'Station 11',
      'street': '620 West 28th St',
      'phone': '704-336-2130',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28206'
    },
    {
      'name': 'Station 12',
      'street': '420 Inwood Dr',
      'phone': '704-523-3732',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28209'
    },
    {
      'name': 'Station 13',
      'street': '4337 Glenwood Dr',
      'phone': '704-399-4710',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    },
    {
      'name': 'Station 14',
      'street': '114 North Sharon Amity Rd',
      'phone': '704-364-8253',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28211'
    },
    {
      'name': 'Station 15',
      'street': '3617 Frontenac Ave',
      'phone': '704-568-4484',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28215'
    },
    {
      'name': 'Station 16',
      'street': '6623 Park South Dr',
      'phone': '704-554-7363',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28210'
    },
    {
      'name': 'Station 17',
      'street': '5308 Morris Field Drive',
      'phone': '704-359-8259',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    },
    {
      'name': 'Station 18',
      'street': '2337 Keller Ave',
      'phone': '704-399-2933',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28216'
    },
    {
      'name': 'Station 19',
      'street': '1016 Sardis Ln',
      'phone': '704-432-6170',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28270'
    },
    {
      'name': 'Station 20',
      'street': '9400 Nations Ford Rd',
      'phone': '704-525-3217',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28273'
    },
    {
      'name': 'Station 21',
      'street': '1023 Little Rock Rd',
      'phone': '704-399-1532',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28214'
    },
    {
      'name': 'Station 22',
      'street': ' 1917 West Sugar Creek Rd',
      'phone': '704-597-8840',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28262'
    },
    {
      'name': 'Station 23',
      'street': '7400 East WT Harris Blvd',
      'phone': '704-536-0331',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28227'
    },
    {
      'name': 'Station 24 ',
      'street': '7132 Pineville-Matthews Rd',
      'phone': '704-542-6071',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28226'
    },
    {
      'name': 'Station 25',
      'street': '6741 Pleasant Grove Rd',
      'phone': '704-392-8636',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28216'
    },
    {
      'name': 'Station 26',
      'street': '9231 South Tryon St',
      'phone': '704-588-6752',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28273'
    },
    {
      'name': 'Station 27',
      'street': '111 Ken Hoffman Drive',
      'phone': '704-547-9355',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28262'
    },
    {
      'name': 'Station 28',
      'street': '8031 Old Statesville Rd',
      'phone': '704-598-6990',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28269'
    },
    {
      'name': 'Station 29',
      'street': '2121 Margaret Wallace Rd',
      'phone': '704-537-9341',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28105'
    },
    {
      'name': 'Station 30',
      'street': '4707 Belle Oaks Dr',
      'phone': '704-357-3791',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28217'
    },
    {
      'name': 'Station 31',
      'street': '3820 Ridge Rd',
      'phone': '704-432-8239',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28269'
    },
    {
      'name': 'Station 32',
      'street': '9225 Bryant Farms Rd',
      'phone': '704-544-3975',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28277'
    },
    {
      'name': 'Station 33',
      'street': '2001 Mt. Holly-Huntersville Rd',
      'phone': '704-432-0688',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28214'
    },
    {
      'name': 'Station 34',
      'street': '2824 Rocky River Rd',
      'phone': '704-432-0935',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28215'
    },
    {
      'name': 'Station 35',
      'street': '1120 Pavilion Blvd',
      'phone': '704-432-0931',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28262'
    },
    {
      'name': 'Station 36',
      'street': '2325 West Mallard Creek Church Rd',
      'phone': '704-432-1782',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28262'
    },
    {
      'name': 'Station 37',
      'street': '13828 S. Tryon St',
      'phone': '704-432-3954',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28278'
    },
    {
      'name': 'Station 38',
      'street': '12100 Shopton Rd W.',
      'phone': '704-353-1275',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '27278'
    },
    {
      'name': 'Station 39',
      'street': '8325 ProvideNCe Rd',
      'phone': '704-336-4878',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28277'
    },
    {
      'name': 'Station 40',
      'street': '9720 Harrisburg Rd',
      'phone': '704-432-5159',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28215'
    },
    {
      'name': 'Station 41',
      'street': '5740 West Blvd',
      'phone': '(704) 588-0700',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28208'
    },
    {
      'name': 'Station 42',
      'street': '5620 Central Ave',
      'phone': '704-432-1813',
      'state': 'NC',
      'city': 'Charlotte',
      'zip': '28212'
    }
  ];
  
  const cmsSchools = [
    {
      'name': 'Albemarle Road ',
      'street': '7800 Riding Trail Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28212
    },
    {
      'name': 'Allenbrook',
      'street': '1430 Allenbrook Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Ashley Park',
      'street': '2401 Belfast Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Bain',
      'street': '11540 Bain School Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28227
    },
    {
      'name': 'Ballantyne',
      'street': '15425 Scholastic Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'Barnette',
      'street': '13659 Beatties Ford Road ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Barringer Academic',
      'street': '1546 Walton Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Berewick',
      'street': '5910 Dixie River Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28278
    },
    {
      'name': 'Berryhill',
      'street': '10501 Windy Grove Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28278
    },
    {
      'name': 'Beverly Woods',
      'street': '6001 Quail Hollow Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28210
    },
    {
      'name': 'Billingsville',
      'street': '124 Skyland Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Blythe ',
      'street': '12202 Hambright Road ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Briarwood',
      'street': '1001 Wilann Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'Bruns',
      'street': '501 South Bruns Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Chantilly ',
      'street': '701 Briar Creek Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Clear Creek',
      'street': '13501 Albemarle Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28227
    },
    {
      'name': 'Collinswood Language',
      'street': '4000 Applegate Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28209
    },
    {
      'name': 'Cornelius',
      'street': '21126 Catawba Avenue ',
      'city': 'Cornelius ',
      'state': 'NC',
      'zip': 28031
    },
    {
      'name': 'Cotswold',
      'street': '300 Greenwich Road  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28211
    },
    {
      'name': 'Croft Community',
      'street': '4911 Hucks Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28269
    },
    {
      'name': 'Crown Point',
      'street': '3335 Sam Newell Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28105
    },
    {
      'name': 'David Cox',
      'street': '4215 David Cox Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28269
    },
    {
      'name': 'Davidson',
      'street': '635 South Street ',
      'city': 'Davidson',
      'state': 'NC',
      'zip': 28036
    },
    {
      'name': 'Devonshire',
      'street': '6500 Barrington Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'Dilworth',
      'street': '405 East Park Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28203
    },
    {
      'name': 'Druid Hills Academy',
      'street': '2801 Lucena Street ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28206
    },
    {
      'name': 'Eastover',
      'street': '500 Cherokee Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28207
    },
    {
      'name': 'EE Waddell Language',
      'street': '7030 Nations Ford Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28217
    },
    {
      'name': 'Elizabeth Lane',
      'street': '121 Elizabeth Lane ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28105
    },
    {
      'name': 'Elizabeth Traditional',
      'street': '1601 Park Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28204
    },
    {
      'name': 'Elon Park',
      'street': '11425 Ardrey Kell Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'Endhaven',
      'street': '6815 Endhaven Lane ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'First Ward',
      'street': '715 North Caldwell Street ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28202
    },
    {
      'name': 'Grand Oak',
      'street': '15410 Stumptown Road ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Greenway Park',
      'street': '8301 Monroe Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28212
    },
    {
      'name': 'Grier Academy',
      'street': '8330 Grier Rd ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'Hawk Ridge',
      'street': '9201 Bryant Farms Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'Hickory Grove',
      'street': '6709 Pence Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'Hidden Valley',
      'street': '5100 Snow White Lane ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28213
    },
    {
      'name': 'Highland Creek',
      'street': '7242 Highland Creek Parkway ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28269
    },
    {
      'name': 'Highland Mill Montessori',
      'street': '3201 Clemson Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Highland Renaissance',
      'street': '125 West Craighead Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28206
    },
    {
      'name': 'Hornet’s Nest',
      'street': '6700 Beatties Ford Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28216
    },
    {
      'name': 'Huntersville',
      'street': '200 Gilead Road  ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Huntingtowne Farms',
      'street': '2520 Huntingtowne Farms Lane  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28210
    },
    {
      'name': 'Idlewild',
      'street': '7101 Idlewild Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28212
    },
    {
      'name': 'Irwin Academic',
      'street': '329 N. Irwin Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28202
    },
    {
      'name': 'JH Gunn',
      'street': '7400 Harrisburg Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'JV Washam',
      'street': '9611 Westmoreland Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28031
    },
    {
      'name': 'Lake Wylie',
      'street': '13620 Erwin Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28273
    },
    {
      'name': 'Lansdowne',
      'street': '6400 Prett Court ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28270
    },
    {
      'name': 'Lawrence Orr',
      'street': '4835 Shamrock Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'Lebanon Road Elementary',
      'street': '7300 Lebanon Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28227
    },
    {
      'name': 'Long Creek',
      'street': '9213-A Beatties Ford Road ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Mallard Creek',
      'street': '9801 Mallard Creek Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28262
    },
    {
      'name': 'Marie G. Davis',
      'street': '3351 Griffith St ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28203
    },
    {
      'name': 'Matthews',
      'street': '200 E. McDowell Street ',
      'city': 'Matthews',
      'state': 'NC',
      'zip': 28105
    },
    {
      'name': 'McAlpine',
      'street': '9100 Carswell Lane ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'McKee Road',
      'street': '4101 McKee Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28270
    },
    {
      'name': 'Merry Oaks',
      'street': '3508 Draper Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Montclaire',
      'street': '5801 Farmbrook Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28210
    },
    {
      'name': 'Morehead STEM',
      'street': '',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': null
    },
    {
      'name': 'Mountain Island',
      'street': '7905 Pleasant Grove Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28216
    },
    {
      'name': 'Myers Park Traditional',
      'street': '2132 Radcliffe Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28207
    },
    {
      'name': 'Nathaniel Alexander',
      'street': '7910 Neal Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28262
    },
    {
      'name': 'Nations Ford',
      'street': '8300 Nations Ford Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28217
    },
    {
      'name': 'Newell',
      'street': '325 Rocky River Rd. W ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28213
    },
    {
      'name': 'Oakdale',
      'street': '1825 Oakdale Road  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28216
    },
    {
      'name': 'Oakhurst STEAM Academy',
      'street': '4511 Monroe Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Oaklawn Language Academy',
      'street': '1810 Oaklawn Avenue  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28216
    },
    {
      'name': 'Olde Providence',
      'street': '3800 Rea Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28226
    },
    {
      'name': 'Palisades Park',
      'street': '15321 York Road  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28278
    },
    {
      'name': 'Park Road',
      'street': '3701 Haven Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28209
    },
    {
      'name': 'Parkside',
      'street': '2945 Johnston-Oehler Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28269
    },
    {
      'name': 'Paw Creek',
      'street': '1300 Cathey Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28214
    },
    {
      'name': 'Pineville',
      'street': '204 Lowry Street ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28134
    },
    {
      'name': 'Pinewood',
      'street': '805 Seneca Place ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28210
    },
    {
      'name': 'Piney Grove',
      'street': '8801 Eaglewind Drive  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28212
    },
    {
      'name': 'Polo Ridge',
      'street': '11830 Tom Short Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'Providence Springs',
      'street': '10045 Providence Church Lane ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28277
    },
    {
      'name': 'Rama Road',
      'street': '1035 Rama Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28211
    },
    {
      'name': 'Reedy Creek',
      'street': '10801 Plaza Road Extension ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28215
    },
    {
      'name': 'Reid Park Academy',
      'street': '4108 West Tyvola Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'River Gate',
      'street': '15340 Smith Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28273
    },
    {
      'name': 'River Oaks Academy',
      'street': '1015 Mt. Holly-Huntersville Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28214
    },
    {
      'name': 'Sedgefield',
      'street': '715 Hartford Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28209
    },
    {
      'name': 'Selwyn',
      'street': '2840 Colony Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28211
    },
    {
      'name': 'Shamrock Gardens',
      'street': '3301 Country Club Drive  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Sharon',
      'street': '4330 Foxcroft Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28211
    },
    {
      'name': 'Smithfield',
      'street': '3200 Smithfield Church Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28210
    },
    {
      'name': 'Starmount ES',
      'street': '1600 Brookdale Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28210
    },
    {
      'name': 'Statesville Road',
      'street': '5833 Milhaven Lane  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28269
    },
    {
      'name': 'Steele Creek',
      'street': '4100 Gallant Lane ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28273
    },
    {
      'name': 'Sterling',
      'street': '9601 China Grove Church Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28134
    },
    {
      'name': 'Stoney Creek',
      'street': '14015 Mallard Roost Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28262
    },
    {
      'name': 'Thomasboro',
      'street': '538 Bradford Drive ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Torrence Creek',
      'street': '14550 Ranson Road ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Trillium Springs Montessori',
      'street': '9213 Beatties Ford Road ',
      'city': 'Huntersville',
      'state': 'NC',
      'zip': 28078
    },
    {
      'name': 'Tuckaseegee',
      'street': '2028 Little Rock Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28214
    },
    {
      'name': 'University Meadows',
      'street': '1600 Pavilion Blvd.  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28262
    },
    {
      'name': 'University Park',
      'street': '2400 Hildebrand Street  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28216
    },
    {
      'name': 'Walter G. Byers',
      'street': '1415 Hamilton Street ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28206
    },
    {
      'name': 'Westerly Hills',
      'street': '4420 Denver Avenue ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Whitewater Academy',
      'street': '11600 White Rapids Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28214
    },
    {
      'name': 'Winding Springs',
      'street': '6601 Horace Mann Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28269
    },
    {
      'name': 'Windsor Park',
      'street': '3910 Sudbury Road  ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Winget Park',
      'street': '12235 Winget Road ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28278
    },
    {
      'name': 'Winterfield',
      'street': '3100 Winterfield Place ',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28205
    },
    {
      'name': 'Renaissance West STEAM Academy',
      'street': '3241 New Renaissance Way',
      'city': 'Charlotte',
      'state': 'NC',
      'zip': 28208
    },
    {
      'name': 'Other',
      'street': '',
      'city': '',
      'state': '',
      'zip': ''
    },
    {
      'name': 'No School',
      'street': '',
      'city': '',
      'state': '',
      'zip': ''
    }
  ];

  export default async (connection: Connection, verbose = false) => {
    if (verbose) {
      console.log('Seeding Code for Charlotte');
    }

    try{
        const repo = connection.getRepository(Affiliation)

        await repo.create({
            'type': 'cfc',
            'name': 'Code for Charlotte',
            'addressStreet': '1000 NC Music Factory Blvd',
            'addressCity': 'Charlotte',
            'addressState': 'NC',
            'addressZip': '28206'
          })
          await Promise.all(cmpdStations.map(async station => {
              if (verbose) {
                console.log(`Seeding CMPD Station ${station.name}`);
              }
              await repo.create({
                'type': 'cmpd',
                'name': station.name,
                'addressStreet': station.street,
                'addressCity': station.city,
                'addressState': station.state,
                'addressZip': station.zip,
                'phone': station.phone
              });
            }));
        
            await Promise.all(cfdStations.map(async station => {
              if (verbose) {
                console.log(`Seeing CFD Station ${station.name}`);
              }
              await repo.create({
                'type': 'cfd',
                'name': station.name,
                'addressStreet': station.street,
                'addressCity': station.city,
                'addressState': station.state,
                'addressZip': station.zip,
                'phone': station.phone
              });
            }));
        
            await Promise.all(cmsSchools.map(async school => {
              if (verbose) {
                console.log(`Seeding CMS School ${school.name}`);
              }
              await repo.create({
                'type': 'cms',
                'name': school.name,
                'addressStreet': school.street,
                'addressCity': school.city,
                'addressState': school.state,
                'addressZip': school.zip && school.zip.toString()
              });
            }));
    } catch(e) {
        console.error(e)
    }

  }