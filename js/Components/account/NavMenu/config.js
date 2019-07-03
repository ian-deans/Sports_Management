export const capFirstLetter = word => {
  let arr = word.split( '' );
  arr[ 0 ] = arr[0].toUpperCase();
  return arr.join('')
}

