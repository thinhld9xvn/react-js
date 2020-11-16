import React from 'react';

import './css/login.min.css';

import {onClick_toggleStateForm, 
		onChange_handleChangedValue,
		onBlur_handleValidate,
		onSubmit_login} from 'handleEvents/loginHandleEvents';

export default class Login extends React.Component {

  constructor(props) {

	super(props);    
	
	this.state = {

		LOGIN_URL : window.location.origin + '/admin/login/callLogin',

		formFields : {

			username : 'ldthinh9xvn',
			password : 'PowerDattu1991@#'

		},

		loginFormValidation : {

			errorMessages : {				

				requiredError : 'Trường này không được bỏ trắng.'

			},

			fields : {

				username : {

					error : false,
					error_message : ''

				},

				password : {

					error : false,
					error_message : ''

				}

			},

			formValidation : false

		},

		showLoginForm : true,
		is_perform_login : false
		
	};	

  }

  componentDidMount() {
	
	document.body.style.backgroundColor = '#dfe0e2';
	document.body.style.backgroundImage = 'url(/frontend/js/admin/modules/login/images/pattern.jpg)';
	document.body.style.backgroundRepeat = 'repeat';

	document.getElementById('txtUserName').focus();

  }

  render() {

    return (
        <div className="w100p">
				<div className="login-container">
					<div className="center">
						<h1>
							<i className="fa fa-leaf green mg-right5"></i>
							<span className="red mg-right5">Admin</span>
							<span className="grey" id="id-text2">CPanel</span>
						</h1>
						<h4 className="blue" id="id-company-text">© GIG COMPANY 2020 - 2021</h4>
					</div>

					<div className="position-relative">

						<div id="login-box" 
							className={"login-box widget-box no-border animate ".concat(this.state.showLoginForm ? "visible" : "no-visible")}>
							<div className="widget-body">
						
								<div className="widget-main">			

									<h4 className="header blue lighter bigger">
										<i className="fa fa-coffee green mg-right5"></i>
										Mời nhập thông tin đăng nhập
									</h4>

									<form id="frmUserLogin" 
										  className={"mg-top30 ".concat(this.state.is_perform_login ? 'disabled' : '')}
										  onSubmit={onSubmit_login.bind(this)}>

										<fieldset>

											<label className="block clearfix">

												<span className="block input-icon input-icon-right">

													<input type="text" 
														   id="txtUserName" 
														   className="form-control"
														   placeholder="Tên đăng nhập"
														   data-fieldname="username"
														   autoComplete="off"														   
														   value={this.state.formFields.username}
														   onChange={onChange_handleChangedValue.bind(this)}
														   onBlur={onBlur_handleValidate.bind(this)} />														

													<i className="fa fa-user"></i>												

												</span>

												{
													this.state.loginFormValidation.fields.username.error ?

													<span className="block error-msg">

														<span className="fa fa-exclamation-circle mg-right5"></span>
														{this.state.loginFormValidation.fields.username.error_message}

													</span> :

													null

												}

											</label>

											<label className="block clearfix">

												<span className="block input-icon input-icon-right">
													
													<input type="password" 
														   id="txtUserPassword" 
														   className="form-control" 
														   placeholder="Mật khẩu"
														   data-fieldname="password"
														   value={this.state.formFields.password}
														   onChange={onChange_handleChangedValue.bind(this)}														   
														   onBlur={onBlur_handleValidate.bind(this)} />
													
													<i className="fa fa-lock"></i>

												</span>

												{
													this.state.loginFormValidation.fields.password.error ?

													<span className="block error-msg">

														<span className="fa fa-exclamation-circle mg-right5"></span>
														{this.state.loginFormValidation.fields.password.error_message}

													</span> :

													null

												}

											</label>

											<div className="clearfix mg-top30">

												<div className="pull-left mg-top10">

													<a href="#" 													    
														className="forgot-password-link red"
														onClick={onClick_toggleStateForm.bind(this)}>

														<i className="fa fa-arrow-right mg-right5"></i>
														Quên mật khẩu

													</a>

												</div>												

												<button type="submit" className="pull-right btn btn-sm btn-primary">
													
													<i className="fa fa-key mg-right5"></i>
													<span className="bigger-110">Đăng nhập</span>

												</button>

											</div>
											
										</fieldset>

									</form>

								</div>

							</div>

						</div>

						<div id="forgot-box" className={"forgot-box widget-box no-border animate ".concat(! this.state.showLoginForm ? "visible" : "no-visible")}>
							
							<div className="widget-body">

								<div className="widget-main">

									<h4 className="header red lighter bigger">
										<i className="fa fa-key mg-right5"></i>
										Lấy lại mật khẩu
									</h4>

									<p>
										Mời nhập email của bạn để nhận mật khẩu
									</p>

									<form>
										<fieldset>
											<label className="block clearfix">
												<span className="block input-icon input-icon-right">
													<input type="email" className="form-control" placeholder="Email" />
													<i className="fa fa-envelope"></i>
												</span>
											</label>

											<div className="clearfix">
												<button type="button" className="width-35 pull-right btn btn-sm btn-danger">
													<i className="fa fa-lightbulb-o mg-right5"></i>
													<span className="bigger-110">Gửi đi</span>
												</button>
											</div>
										</fieldset>
									</form>
								</div>

								<div className="toolbar center">

									<a href="#" 
									   data-target="#login-box" 
									   className="back-to-login-link"
									   onClick={onClick_toggleStateForm.bind(this)}>

										<span className="mg-right5">Trở lại trang chính</span>
										<i className="fa fa-arrow-right"></i>

									</a>

								</div>
							</div>
						</div>
						
					</div>
				
				</div>

			</div>
    )

  }
  
}