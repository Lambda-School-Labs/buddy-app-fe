import React, {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import {isSignedIn} from '../authHelper';
const AuthStack = props => {
const [authorized, setAuthorized] = useState(false);
const [checkAuthorized, setCheckAuthorized] = useState(false);

    useEffect(() => {
        isSignedIn().then(res => {
            setAuthorized(res);
            setCheckAuthorized(true);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    if(checkAuthorized === false) {
        return null;
    }

    if(authorized) {
        return <Dashboard />
    } else {
        return <SignIn />
    }
}

export default AuthStack;