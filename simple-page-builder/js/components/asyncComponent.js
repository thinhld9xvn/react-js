import React, {Component} from 'react';

export const asyncComponent = (importComponent) => {

    return class extends Component {

       constructor(props) {

          super(props);

          this.state = {

            component: null,
            isLoading: true

          }

       }

       componentWillMount() {}

       componentDidMount() {

            importComponent()
                    .then(cmp => {                                  

                this.setState({

                    component: cmp.default                            

                });
                

            });

        }

        render() {

            const { component } = this.state,
                 C = component;

            return (

               C && <C {...this.props} />

            )

        }
    }
};