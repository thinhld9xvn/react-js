import React, { Component } from 'react';

import './css/treelist.min.css';

class CustomTreeListSelect extends Component {

    constructor(props) {

        super(props);       

        this.state = {
            defaultValue: '',
            defaultName: '',
            data : props.data,            
            /*data : [
                {
                    name : 'Môn học', 
                    value : '1',
                    selected : false                   
                },

                {
                    name : 'Hoạt động',
                     value : '2',
                     selected : false,
                     
                }
            ],*/
            scrollTop : 0,            
            isOpen: false
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChooseItem = this.handleChooseItem.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSavePos = this.handleSavePos.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);  
        this.waitCustomListsLoading = this.waitCustomListsLoading.bind(this);
        this.getItemSelectedIndex = this.getItemSelectedIndex.bind(this);
        this.getListItem = this.getListItem.bind(this);
        this.setValue = this.setValue.bind(this);
        this.resizePos = this.resizePos.bind(this);

        this.onAddEvent_handleOutsideClick = false;

        this.props.parent[this.props.componentInst] = this;

    }

    componentDidMount() {        

        const { data } = this.state;

        data.map((item, i) => {

            if ( item.selected ) {

                this.setState({

                    defaultName : item.name,
                    defaultValue : item.value
        
                });
                
            }

        });      

    }   

    waitCustomListsLoading(elem, callback) {

        const self = this;

        if ( elem.childElementCount > 0 ) {

            callback();

        }

        else {

            setTimeout(() => { self.waitCustomListsLoading(elem, callback) }, 200);

        }

    }

    getItemSelectedIndex() {

        return this.state.data.findIndex(e => e['selected'] );

    }

    handleChooseItem(v) {
        

        let data = this.state.data,
            chooseItemCallback = (e) => {

                if ( e['value'] == v ) {
                
                    e['selected'] = ! e['selected'] ? true : e['selected']; 
    
                }
    
                else {
    
                    if ( e['selected'] ) { e['selected'] = false; }
    
                } 

                if ( e['childrens'] && e['childrens'].length > 0 ) {

                    e['childrens'].map(chooseItemCallback);

                }

                return e;

            }   

        data.map(chooseItemCallback);

        this.setState({
            data : data
        });

    }

    handleSavePos(e) {

        e.preventDefault();

        let offsetTop = e.currentTarget.offsetTop > 0 ? e.currentTarget.offsetTop : this.state.scrollTop;

        this.setState({
            scrollTop : offsetTop
        });


    }

    handleSelect(value, name, e) {

        e.preventDefault();

        let target = e.currentTarget,                       
            default_value = this.state.defaultValue,
            default_name = this.state.defaultName;

        //console.log( offsetTop );

        if ( typeof( name ) !== 'undefined' && name !== '' ) {

            default_name = name;

        }

        if ( typeof( value ) !== 'undefined' && value !== '' ) {

            default_value = value;

        }      

        this.handleChooseItem(default_value);
    
        this.setState(prevState => ({
           
            defaultValue: default_value,
            defaultName: default_name           

        }));

        if ( this.props.parent && this.props.variableReturn ) {            

            this.props.parent[this.props.variableReturn] = default_value;

            console.log( this.props.variableReturn );

        }        

        this.handleOutsideClick(e, true);

        /*if ( this.props.handleChooseItemCallback ) {

            setTimeout(() => {
                this.props.handleChooseItemCallback(default_value);
            }, 200);

        }*/

    }    

    handleOpen(e) {

        let self = this,
            pageY = e.pageY,
            isOpen = self.state.isOpen;       

        if ( ! self.onAddEvent_handleOutsideClick ) {

            self.setState(prevState => ({

                isOpen: ! prevState.isOpen

            }), () => {

                document.addEventListener('click', self.handleOutsideClick, false);

                if ( self.props.displayMode === 'dialog' ) {

                    /*self.resizePos(pageY); 

                    const elem = document.querySelector('.popbox.opened.visible .text');

                    elem ? elem.style.overflow = 'hidden' : null;*/
    
                }

            });

            self.onAddEvent_handleOutsideClick = true;

        }    

        if ( ! isOpen ) {

            let target = e.currentTarget,
                parentTarget = target.nextElementSibling,                

                scrollTop = self.state.scrollTop,

                offsetHeight = e.currentTarget.offsetHeight;

            if ( scrollTop === 0 ) {

                const targetOffsetHeight = target.offsetHeight,

                      index = self.getItemSelectedIndex();

                if ( index !== null ) {
 
                    scrollTop = ( index + 1 ) * targetOffsetHeight;

                }

            }

            this.waitCustomListsLoading(parentTarget, () => {                

                parentTarget.scrollTop = scrollTop - offsetHeight;

            });           

        }    

    }

    handleOutsideClick(e, isClose) {

        e.preventDefault();

        if ( ! document.querySelector('.select-list.open').contains(e.target) || isClose ) {

            document.removeEventListener('click', this.handleOutsideClick, false);

            this.onAddEvent_handleOutsideClick = false;      

            this.setState(prevState => ({

                isOpen: false

            }));

            const elem = document.querySelector('.popbox.opened.visible .text');

            elem ? elem.style.overflow = '' : null;

        }

    }  

    handleToggleChild(e) {

        e.preventDefault();

        const target = e.currentTarget,
              childList = target.nextElementSibling;

        if ( childList.classList.contains('active') ) {

            target.classList.remove('-minimize');
            childList.classList.remove('active');

        }

        else {

            target.classList.add('-minimize');
            childList.classList.add('active');

        }



    }

    getListItem(item, index) {

        const self = this,
              temp_subitems = item.childrens ?
                                item.childrens.map(this.getListItem) :
                                null;

        //console.log(item.name + '-' + item.value);

        return (

            <li
                key={index}      
                onClick={this.handleSavePos}          
                className='select-item'>

                <a href="#" 
                   className={item['selected'] ? 'selected' : ''}
                   onClick={(e) => self.handleSelect(item.value, item.name, e)}>

                   {item.name}

                </a>

                {item.childrens && 
                    <span className="expand -minimize"
                          onClick={self.handleToggleChild}></span>}

                {item.childrens && (

                    <ul className="active">
                        {temp_subitems}
                    </ul>

                )}

            </li>

        )

    } 

    setValue(n, v) {

        this.handleChooseItem(v);

        this.setState({
           
            defaultValue: v,
            defaultName: n

        });     

        if ( this.props.parent && this.props.variableReturn ) {

            this.props.parent[this.props.variableReturn] = v;            

        }     

    }

    resizePos(pageY) {        

        const { className } = this.props,
              container = document.querySelector('.option-custom.' + className),
              ul = container.querySelector('.select-list'),              
              offsetLeft = container.offsetLeft,           
              width = container.clientWidth;       
     
        ul.style.left = offsetLeft - width + 20 + 'px';
        ul.style.top = pageY - ul.clientHeight + 'px';                

    }

   render() {
        
        const { placeholder, className } = this.props,
              { defaultName } = this.state,

              select_lists = [],

              self = this;

        this.state.data.map((item, index) => {

            select_lists.push(this.getListItem(item, index));

        });        

        return (
            <div className={"option-custom ".concat(className || '')}>

                <div className='select-input' 
                    onClick={this.handleOpen}>
                    
                    <span className={`${placeholder && defaultName==='' ? 'select-title placeholder' : 'select-title'}`}>
                        {defaultName === '' ? placeholder : defaultName}
                    </span>                    

                </div>
                
                <ul className={"select-list ".concat(this.state.isOpen ? 'open' : '')}>
                     {this.state.isOpen ? select_lists : null}
                </ul>
            
            </div>
        );

    }

}

 export default CustomTreeListSelect;