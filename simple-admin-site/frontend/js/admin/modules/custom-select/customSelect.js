import React, { Component } from 'react';
import './css/style.min.css';

class CustomSelect extends Component {

    constructor(props) {

        super(props);       

        this.state = {
            defaultValue: '',
            defaultName: '',
            data : props.data,            
            /*data : [
                {
                    name : 'Running', 
                    value : 1,
                    selected : false
                },
                {
                    name : 'Working', 
                    value : 2,
                    selected : false
                },
                {
                    name : 'Listening', 
                    value : 3,
                    selected : false
                },
                {
                    name : 'Streaming', 
                    value : 4,
                    selected : false
                },
                {
                    name : 'Walking', 
                    value : 5,
                    selected : false
                },
                {
                    name : 'Cooking', 
                    value : 6,
                    selected : false
                },
                {
                    name : 'Dancing', 
                    value : 7,
                    selected : false
                },
                {
                    name : 'Singing', 
                    value : 8,
                    selected : true
                },
                {
                    name : 'Flying', 
                    value : 9,
                    selected : false
                },
                {
                    name : 'Watching', 
                    value : 10,
                    selected : false
                },
                {
                    name : 'Swimming', 
                    value : 11,
                    selected : false
                },
                {
                    name : 'Playing', 
                    value : 12,
                    selected : false
                },
                {
                    name : 'Sitting', 
                    value : 13,
                    selected : false
                },
                {
                    name : 'Laughing', 
                    value : 14,
                    selected : false
                },
                {
                    name : 'Smiling', 
                    value : 15,
                    selected : false
                },
                {
                    name : 'Typing', 
                    value : 16,
                    selected : false
                }
                

            ],*/
            scrollTop : 0,            
            isOpen: false
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChooseItem = this.handleChooseItem.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);  
        this.waitCustomListsLoading = this.waitCustomListsLoading.bind(this);
        this.getItemSelectedIndex = this.getItemSelectedIndex.bind(this);
        this.onAddEvent_handleOutsideClick = false;

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

        let data = this.state.data;        

        data.map(e => {

            if ( e['value'] == v ) {
                
                e['selected'] = ! e['selected'] ? true : e['selected']; 

            }

            else {

                if ( e['selected'] ) { e['selected'] = false; }

            } 

            return e;

        });

        this.setState({
            data : data
        });

    }

    handleSelect(e, value, name) {

        e.preventDefault();

        let target = e.currentTarget,
            offsetTop = target.offsetTop > 0 ? target.offsetTop : this.state.scrollTop,            
            default_value = this.state.defaultValue,
            default_name = this.state.defaultName;

        //console.log( offsetTop );

        if ( typeof( name ) !== 'undefined' && name !== '' ) {

            default_name = name;

        }

        if ( typeof( value ) !== 'undefined' && value !== '' ) {

            default_value = value;

        }

        if (! this.state.isOpen) {

            document.addEventListener('click', this.handleOutsideClick, false);

            this.onAddEvent_handleOutsideClick = true;

            

        } 
        
        else {

            document.removeEventListener('click', this.handleOutsideClick, false);

            this.onAddEvent_handleOutsideClick = false;

            this.handleChooseItem(default_value);

        }

        this.setState(prevState => ({

            isOpen: ! prevState.isOpen,
            defaultValue: default_value,
            defaultName: default_name,
            scrollTop : offsetTop

        }));

        if ( this.props.parent && this.props.variableReturn ) {

            this.props.parent[this.props.variableReturn] = default_value;            

        }

    }    

    handleOpen(e) {

        let self = this,
            isOpen = self.state.isOpen;       

        if ( ! self.onAddEvent_handleOutsideClick ) {

            self.setState(prevState => ({

                isOpen: ! prevState.isOpen

            }), () => {

                document.addEventListener('click', self.handleOutsideClick, false)

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

    handleOutsideClick(e) {

        this.handleSelect(e);

    }   

   render() {
        
        const { placeholder } = this.props,
              { defaultName } = this.state,

              select_lists = [],

              self = this;

        this.state.data.map((item, index) => {            

            select_lists.push(

                <div
                    key={index}
                    onClick={(e) => self.handleSelect(e, item.value, item.name)}
                    className={'select-item'.concat(item['selected'] ? ' selected' : '')}>
                    <span className='select-title'>{item.name}</span>
                </div>

            )
        });        

        return (
            <div className='option-custom'>
                <div className='select-input' 
                    onClick={this.handleOpen}>
                    <span className={`${placeholder && defaultName==='' ? 'select-title placeholder' : 'select-title'}`}>
                        {defaultName === '' ? placeholder : defaultName}
                    </span>
                </div>
                
                <div className='select-list'>
                     {this.state.isOpen ? select_lists : null}
                </div>
            
            </div>
        );

    }

}

 export default CustomSelect;