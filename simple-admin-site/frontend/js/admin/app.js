import React from 'react';

import { BrowserRouter as Router } from "react-router-dom"

import LoginPage from 'components/pages/login';
import {checkLogin, logout} from 'utils/loginUtils';
import {hasParameterFromUrl, addParameterToUrl, redirectToUrl} from 'utils/UrlUtils';
import {LOGIN_URL} from 'constants/urlConstants.js';
import MainContainer from 'components/layout/maincontainer';

import "regenerator-runtime/runtime";
import "core-js/stable"; // or a more selective import such as "core-js/es/array"

export default class App extends React.Component {

	constructor(props) {

		super(props);

		this.state = {		
						
			component : null

		};

		this.timerRef = null;

	}

	isLoginUrl() {

		return window.location.pathname.indexOf('/admin/login') === 0;

	}

	isRedirectUrlParameter() {

		return hasParameterFromUrl(window.location.href, "redirect_url");

	}

	addRedirectUrlParameter(v) {

		return addParameterToUrl(window.location.href, "redirect_url", v);

	}

	performNotLoginAction() {

		let pathname = window.location.pathname,
			parameters = window.location.search;

		// exist
		if ( this.isLoginUrl() ) {

			// exist
			if ( this.isRedirectUrlParameter() ) {
			}

			else {

				history.pushState("", "", "?redirect_url=/admin/dashboard")

			}			

		}

		else {

			window.location.href = "/admin/login?redirect_url=" + pathname;

		}		

	}

	componentDidMount() {

		let is_logged_in = false,			
			component = null,
			self = this,

		checkSessionLogin = () => {

			checkLogin.call(self)
				.then(response => {

					let data = response.data,
						is_logged_in = data.login_status;

				if ( ! is_logged_in ) {

					redirectToUrl(LOGIN_URL, {

						name : 'redirect_url',
						value : window.location.href

					});

				}

			});

		},

		checkLoginCallback = () => {

			checkLogin.call(self)
				.then(response => {

				let data = response.data;

				component = <LoginPage />;
				
				is_logged_in = data.login_status;
				
				// /admin/login
				if ( self.isLoginUrl() ) {

					logout.call(self)
						.then(response => {

						if ( response.data.response == 'success' ) {

							//
							if ( ! self.isRedirectUrlParameter() ) {
							
								redirectToUrl(LOGIN_URL, {

									name : 'redirect_url',
									value : '/admin/dashboard'
			
								});

							}

							else {

								self.setState({
									component : component
								});		
		
							}

						}
						

					});

				}

				else {

					if ( ! is_logged_in ) {	

						redirectToUrl(LOGIN_URL, {

							name : 'redirect_url',
							value : window.location.href

						});

					}

					else {

						component = ( 

							<Router>

								<div className="w100p">
									<MainContainer /> 
								</div>
								
							</Router>

						);					

						self.setState({
							component : component
						});

						if ( self.timerRef === null ) {

							self.timerRef = setInterval(() => {

								checkSessionLogin();

							}, 10000);

						}

					}

				}				

			});	

		};
		
		checkLoginCallback();

	}

	render() {	

		return ( this.state.component );

	}

}