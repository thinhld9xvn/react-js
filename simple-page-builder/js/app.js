import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'dist/woff.css';
import 'dist/woff2.css';
import 'css/bootstrap.min.css';
import 'css/font-awesome.min.css';
import 'modules/popbox/popbox.css';
import 'css/style.min.css';

// redux
import { rootReducer } from 'modules/redux/reducer/rootReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PageBuilder from './page-builder';

class Application extends Component {

	render() {

		return (

			<PageBuilder />			

		);
	}
}

const store = createStore(rootReducer);

ReactDOM.render( <Provider store={store}> 
					<Application />
				 </Provider>, 
				 document.getElementById('app') );