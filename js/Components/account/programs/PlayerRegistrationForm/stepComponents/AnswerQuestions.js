import React from "react";
import { connect } from "react-redux";
import { SmallSpinner } from "../../../../common";
import * as log from "../../../../../helpers/log";

import {
  getQuestionsForPlayer,
  answerQuestions,
  createPlayerProfile
} from "../../../../../actions/account/playerRegistration";

class AnswerQuestions extends React.Component {
  state = {
    loading: true,
    answers: [],
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    try {
      await this.props.createPlayerProfile();
    } catch ( error ) {
      log.error( "Profile already exists." );
    }
    // await this.props.getQuestionsForPlayer();
    this.setState( { loading: false } );
  };


  questions = () => {

  };

  handleSubmitAnswers = () => {
    // const { answers } = this.state;
    // dispatch action send question answers to api?

    this.setState( { loading: true } );
    // await this.props.answerQuestions();
    //* FIXME: an error is thrown if the person already has a profile created for
    //* this program.

    this.setState( { loading: false } );


  }

  render() {
    return (
      <React.Fragment>
        <h2>Questions</h2>
        { this.state.loading
          ? <SmallSpinner />
          : (
            <button onClick={ this.handleSubmitAnswers }>Submit Answers</button>
          )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ( {
  questions: state.account.playerRegistration.questions,
} );

const mapDispatchToProps = {
  getQuestionsForPlayer,
  answerQuestions,
  createPlayerProfile,
};


export default connect( mapStateToProps, mapDispatchToProps )( AnswerQuestions );