export const getChangedProperties = ( { newData, prevData } ) => {
  const keys = Object.keys( newData );
  const ignoredFields = [ "UPDATED_AT" ];
  const changed = {};
  const unchanged = {};

  keys.forEach( key => {

    const newValue = newData[ key ];
    const prevValue = prevData[ key ];

    const valueHasChanged = newValue !== prevValue;
    const isValidField = !ignoredFields.includes( key );

    if ( isValidField && valueHasChanged ) {
      changed[ key ] = newValue;
    } else {
      unchanged[ key ] = newValue;
    }
  } );
  return [ changed, unchanged ];
};


export const getPropertiesByPrefix = ( obj, prefix ) => {
  const keys = Object.keys( obj );
  let props = {};
  const restData = {};

  keys.forEach( key => {
    if ( key.includes( prefix ) ) {
      const field = key.slice( prefix.length );
      props[ field ] = obj[ key ];
    } else {
      restData[ key ] = obj[ key ];
    }
  } );

  if ( !Object.keys( props ).length ) {
    props = null;
  }

  return [ props, restData ];
};

export const isEmpty = obj =>
  Object.entries( obj ).length < 1 &&
  obj.constructor === Object;

export const filterNullProperties = obj => {
  const keys = Object.keys( obj );
  const notNulls = {};

  keys.filter( key => obj[ key ] !== null )
    .forEach( key => {
      notNulls[ key ] = obj[ key ];
    } );

  return notNulls;
};

export const removeUndefinedProperties = obj => {
  for ( let key in obj ) {
    if ( !obj[ key ] ) {
      delete obj[ key ];
    }
  }
  return obj;
};

export function normalizeDataFromArray( arr ) {
  const data = {};
  const ids = [];
  arr.forEach( item => {
    data[ item.id ] = { ...item };
    ids.push( item.id );
  } );
  return [ data, ids ];
}