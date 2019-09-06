import moment from "moment";

class Moment {
  constructor( date ) {
    this.date = moment( date, "YYYY-MM-DD" );

  }

  render( format = "M/D/YY" ) {
    return this.date.format( format );
  }
}

export default Moment;