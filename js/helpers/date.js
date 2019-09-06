import moment from "moment";

export const dateFromYYYYMMDD = dateString => moment( dateString, "YYYY-MM-DD" );

export const dateFromTimestamp = timestamp => moment( timestamp );
