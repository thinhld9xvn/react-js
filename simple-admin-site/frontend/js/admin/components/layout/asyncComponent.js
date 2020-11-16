import React, {Component} from 'react';

import 'css/component-loading.min.css';

import {getComponentInst} from 'utils/componentUtils';

import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
    <ContentLoader 
    speed={2}
    width={800}
    height={400}
    viewBox="0 0 800 400"
    backgroundColor="#d2d2d2"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="7" y="7" rx="0" ry="0" width="183" height="29" /> 
    <rect x="195" y="7" rx="0" ry="0" width="183" height="29" /> 
    <rect x="6" y="40" rx="0" ry="0" width="6" height="349" /> 
    <rect x="12" y="40" rx="0" ry="0" width="755" height="6" /> 
    <rect x="765" y="40" rx="0" ry="0" width="6" height="349" /> 
    <rect x="12" y="383" rx="0" ry="0" width="755" height="6" /> 
    <rect x="40" y="65" rx="0" ry="0" width="185" height="196" /> 
    <rect x="297" y="65" rx="0" ry="0" width="200" height="10" /> 
    <rect x="264" y="85" rx="0" ry="0" width="275" height="10" /> 
    <rect x="264" y="108" rx="0" ry="0" width="275" height="10" /> 
    <rect x="264" y="130" rx="0" ry="0" width="275" height="10" /> 
    <rect x="264" y="151" rx="0" ry="0" width="275" height="10" />
  </ContentLoader>
  )

export const asyncComponent = (importComponent) => {

    return class extends Component {

       constructor(props) {

          super(props);

          this.state = {

            component: null,
            isLoading: true

          }

       }

       componentWillMount() {

          const sidebarInst = getComponentInst('sidebarLeftRef');

          sidebarInst.setSidebarDisable
                      .call(sidebarInst, true);

           const element = document.createElement('div');

           element.className = "component-loading animation";

           document.body.appendChild(element);           


       }

       componentDidMount() {

            const sidebarInst = getComponentInst('sidebarLeftRef');

            const self = this,
                  element = document.querySelector('.component-loading');

            setTimeout(() => {

                element.classList.add('per-half');

                importComponent()
                    .then(cmp => {                                  

                        self.setState({

                            component: cmp.default                            

                        });

                        element.classList.add('finish');                        

                        setTimeout(() => {                            

                            element.remove();                     

                            self.setState({

                                isLoading: false

                            });       

                            sidebarInst.setSidebarDisable
                                        .call(sidebarInst, false);                            

                        }, 1000);

                    });

            }, 100);

        }

        render() {

            const { isLoading, component } = this.state,
                 C = component;

            return (

                isLoading ? <MyLoader /> :
                
                            C && <C {...this.props} />

            )

        }
    }
};