import moment from 'moment';



const ADDRESS = "address";
const UPDATED_AT = "updated_at";



export function capitalizeFirstLetter(string) {
  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function changedFields(newData, data) {
  const changed = {};
  Object.keys(newData).forEach(field => {
    if (field !== UPDATED_AT && newData[field] !== data[field]) {
      changed[field] = newData[field]
    }
  });
  return changed;
};
export const containsOnlyNumbers = value => {
  if (value.search(/([A-Za-z-\/\\^$*+?!.()|[\]{}@#%&])/g) === -1) {
    return true;
  }
  return false;
};

export const containsOnlyLetters = value => {
  if (
    value.search(/([\/\\^$*+?!.()|[\]{}@#%&0-9])/g) === -1 &&
    value.search(/([A-Za-z ])/g) > -1
  ) {
    return true
  }
  return false
};

export const dateFromYYYYMMDD = dateString => moment(dateString, 'YYYY-MM-DD');

export const dateFromTimestamp = timestamp => moment(timestamp);

export function extractAddressFields(combinedData) {
  console.log('extractAddressFields()')
  const keys = Object.keys(combinedData);
  let addressData = {};
  const data = {};

  keys.forEach(key => {
    if (key.includes(ADDRESS)) {
      const field = key.slice(8);
      addressData[field] = combinedData[key];
    } else {
      data[key] = combinedData[key]
    }
  });

  if (!Object.keys(addressData).length) {
    addressData = null;
  }
  console.log('extracting address fields..')
  console.log(data, addressData)
  return [data, addressData];
};

export const formatCurrency = amount => {
  const array = amount.toString().split("");
  array.splice((array.length - 2), 0, ".");
  array.unshift("$");
  return array.join("");
};

export const formatUIData = response => {
  const uiData = response.data;
  const formatted = Object.keys(uiData)
    .map(key => ({
      key,
      text: uiData[key],
      value: key,
    }));
  return { data: formatted };
};

export const getNumberRange = (min, max, storage) => {
  if (storage.length > (max - min)) {
    return storage.map(num => num.toString())
  }
  let newNumber = min + storage.length
  storage.push(newNumber)
  return getNumberRange(min, max, storage)
};

export const isEmpty = obj =>
  Object.entries(obj).length < 1 && obj.constructor === Object;

export const lastInPath = pathname => pathname.split('/').pop();

export function removeNullFields(data) {
  Object.keys(data)
    .filter(key => data[key] === null)
    .forEach(field => {
      delete data[field];
    })

  return data;
}