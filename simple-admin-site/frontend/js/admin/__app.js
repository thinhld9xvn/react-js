import React from 'react';

import CustomTreeList from './modules/custom-select/customTreeList';

export default class App extends React.Component {

	constructor(props) {

		super(props);		

	}

	componentDidMount() {		

	}

	render() {	

		return (
            <CustomTreeList />
        );

	}

}