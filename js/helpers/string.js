export function capitalizeFirstLetter( string ) {
  return string
    .split( "-" )
    .map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
    .join( " " );
}

export const containsOnlyNumbers = string => {
  if ( string.search( /([A-Za-z-/\\^$*+?!.()|[\]{}@#%&])/g ) === -1 ) {
    return true;
  }
  return false;
};


export const containsOnlyLetters = string => {
  if (
    string.search( /([/\\^$*+?!.()|[\]{}@#%&0-9])/g ) === -1 &&
    string.search( /([A-Za-z ])/g ) > -1
  ) {
    return true;
  }
  return false;
};

export const getLastPathFromUrl = url => url.split( "/" ).pop();

export const formatCurrency = amount => {
  const array = amount.toString().split( "" );
  array.splice( ( array.length - 2 ), 0, "." );
  array.unshift( "$" );
  return array.join( "" );
};