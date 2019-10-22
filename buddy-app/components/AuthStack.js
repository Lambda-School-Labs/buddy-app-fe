import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import { isSignedIn } from "../authHelper";
import { connect } from 'react-redux';
import {isLoadingPage} from '../actions/buddyActions';
const AuthStack = props => {
  const [authorized, setAuthorized] = useState(false);
  const [checkAuthorized, setCheckAuthorized] = useState(false);
 

  useEffect(() => {
    props.isLoadingPage(false);
    isSignedIn()
      .then(res => {
        setAuthorized(res);
        setCheckAuthorized(true);
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (checkAuthorized === false) {
    return null;
  }

  if (authorized) {
    return <Dashboard />;
  } else {
    return <SignIn />;
  }
};

const mapStateToProps = state => {
    return {
        ...state,
    }
}
export default connect(mapStateToProps, {isLoadingPage})(AuthStack);
