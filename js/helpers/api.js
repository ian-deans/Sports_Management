import { apiError } from "./log";
export class ApiError {
  constructor( message, status = 500 ) {
    this.message = message;
    this.status = status;
    apiError( this.message );
  }
}

export function getResourceFromApiData( apiData, resourceName ) {
  if ( apiData[ resourceName ] ) {

    const { [ resourceName ]: {
      data: targetResource,
    }, ...data } = apiData;
    return [ data, targetResource ];
  }

  return [ apiData, null ];
}

export const formatUIData = apiResponse => {
  const uiData = apiResponse.data;
  const formatted = Object.keys( uiData )
    .map( key => ( {
      key,
      text: uiData[ key ],
      value: key,
    } ) );
  return { data: formatted };
};