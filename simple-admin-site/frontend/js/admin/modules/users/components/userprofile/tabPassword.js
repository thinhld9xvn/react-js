import React, { Component } from 'react';

import ChangeUserPasswordLayout from "../layout/changeUserPasswordLayout";

import {onSubmit_handleForm} from 'handleEvents/userPasswordHandleEvents';

class TabPassword extends Component {

    constructor(props) {        

        super(props);

    }

    render() {

        const events = {

            handleSubmitForm : onSubmit_handleForm

        };

        return (

            <ChangeUserPasswordLayout events = {events} />

        );

    }
}

export default TabPassword;