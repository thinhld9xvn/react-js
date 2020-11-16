import React from 'react';
import ReactDOM from 'react-dom';

import 'css/fonts.min.css';
import 'css/font-awesome.min.css';
import 'css/style.min.css';
import 'libraries/popbox/popbox.min.css';

// redux
import { rootReducer } from 'libraries/redux/reducer/rootReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './app';

const store = createStore(rootReducer);

ReactDOM.render(		
	<Provider store={store}>
		<App />
	</Provider>
	,
	document.getElementById('app')
);