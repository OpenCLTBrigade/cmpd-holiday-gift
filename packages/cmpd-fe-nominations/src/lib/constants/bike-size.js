const BikeSize = {
  TRICYCLE: 'TRICYCLE',
  '12_INCH': '12_INCH',
  '16_INCH': '16_INCH',
  '20_INCH_COASTER': '20_INCH_COASTER',
  '20_INCH_GEARED': '20_INCH_GEARED',
  '24_INCH_GEARED': '24_INCH_GEARED'
};

const sizes = [
  { name: BikeSize.TRICYCLE, description: 'Trycicle' },
  { name: BikeSize['12_INCH'], description: '12" bicycle' },
  { name: BikeSize['16_INCH'], description: '16" bicycle' },
  {
    name: BikeSize['20_INCH_COASTER'],
    description: '20" coaster brake bicycle'
  },
  { name: BikeSize['20_INCH_GEARED'], description: '20" geared bicycle' },
  { name: BikeSize['24_INCH_GEARED'], description: '24" geared bicycle' }
];

export const bikeSizeMap = sizes.reduce((acc, { name, description }) => ({ ...acc, [name]: description }), {});
export const descFromValue = value => bikeSizeMap[value] || value;

export default BikeSize;
