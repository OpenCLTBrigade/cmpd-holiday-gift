// Added in a toString because the seeder was throwing an untraceable error >_>
const bool = (myValue: string = '') => myValue.toString().toLowerCase() == 'true';

export default bool;
