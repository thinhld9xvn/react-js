import React, { Component } from 'react';

import './css/treelist.min.css';
import { getCopiedJsonObject } from 'utils/libUtils';
import { isUndefined } from '../../utils/libUtils';

class CustomTreeList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: [],
            filteredItems: [],
            searchText: '',
            coordsNodesList : []
            /*data: [
                {
                    name: 'Môn học',
                    value: '1',
                    selected: false,
                    pending : false,
                    childrens : [

                        {
                            name: 'Toán',
                            value: '1_1',
                            selected: false,
                            pending : false,
                            childrens : [

                                {
                                    name: 'Toán giải tích',
                                    value: '1_1_1',
                                    selected: false,
                                    pending : false,

                                    childrens : [

                                        {
                                            name: 'Mục lục',
                                            value: '1_1_1_1',
                                            selected: false,
                                            pending : false,

                                            childrens : [

                                                {
                                                    name: 'Toán giải tích cơ bản',
                                                    value: '1_1_1_1_1',
                                                    selected: false,
                                                    pending : false
                                                }

                                            ]
                                        }

                                    ]
                
                                },

                                {
                                    name: 'Toán hình học',
                                    value: '1_1_2',
                                    selected: false,
                                    pending : false,
                
                                },

                                {
                                    name: 'Toán rời rạc',
                                    value: '1_1_3',
                                    selected: false,
                                    pending : false,
                
                                },

                            ]
        
                        },

                        {
                            name: 'Lý',
                            value: '1_2',
                            selected: false,
                            pending : false,
        
                        },

                        {
                            name: 'Hóa',
                            value: '1_3',
                            selected: false,
                            pending : false,
        
                        },

                    ]
                },

                {
                    name: 'Hoạt động',
                    value: '2',
                    selected: false,
                    pending : false,

                }
            ],*/
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChooseItem = this.handleChooseItem.bind(this);
        this.getItemSelectedIndex = this.getItemSelectedIndex.bind(this);
        this.getListItem = this.getListItem.bind(this);
        this.handleSearchChanged = this.handleSearchChanged.bind(this);     
        //this.props.parent[this.props.componentInst] = this;

    }

    componentDidMount() {

        let d = getCopiedJsonObject(this.props.data),
            mapData = (item, i, parent) => {

                item.pending = false;
                item.parentValue = parent ? parent.value : null;

                item.childrens &&
                    item.childrens.map((_item, k) => mapData(_item, k, item));

            }

        d.map((item, i) => mapData(item, i, null));

        this.setState({
            data: getCopiedJsonObject(d),
            filteredItems: getCopiedJsonObject(d)
        });

    }

    getItemSelectedIndex() {

        return this.state.filteredItems.findIndex(e => e['selected']);

    }

    handleChooseItem(v) {

        let filteredItems = getCopiedJsonObject( this.state.filteredItems );
        const { coordsNodesList, data } = this.state,          

            processCoordsList = (e) => {

                const index = coordsNodesList.findIndex(node => node.value == e.value);

                if ( index !== -1 ) {

                    coordsNodesList.splice(index, 1);

                }

                else {

                    coordsNodesList.push(e);

                }

            },

            findNode = (list, v) => {

                let searched = null;

                const _findNode = (node) => {

                    if (node.value === v) {

                        searched = node;
                        return;

                    }

                    node.childrens && node.childrens.map(_findNode);

                };

                list.map(_findNode);

                return searched;

            },     

            parseOrignNode = (node, parsedNode) => { 

                let   isSearched = false,
                      addExtraInfo = (nodeResult, info) => {

                        if ( isUndefined(nodeResult.extras) ) { 
                            nodeResult.extras = []; 
                        }

                        const index = nodeResult.extras.findIndex(v => v === parsedNode.value);

                        if ( index !== -1 ) {

                            nodeResult.extras.splice(index, 1);

                        }

                        nodeResult.extras.push(info);

                      },
                      mapNodeLists = (e) => {

                        const nodeResult = coordsNodesList.find(_node => _node.value === e.value);

                        //console.log( coordsNodesList );
                        //console.log( nodeResult );

                        if ( nodeResult ) {

                            parsedNode.pending = true;  
                            isSearched = true; 

                            addExtraInfo(nodeResult, {
                                selected : parsedNode.selected,
                                pending : parsedNode.pending,
                                value : parsedNode.value,
                            });

                            return;

                        }

                        e.childrens && e.childrens.map(mapNodeLists);

                    }             

                if ( node ) {

                    parsedNode.pending = false;

                    node.childrens && node.childrens.map(mapNodeLists);                   

                }

                return isSearched;

            },    

            parseNodeParent = (node) => {

                if (node) {

                    const parent = findNode(filteredItems, node.parentValue);

                    let originNode = findNode(data, node.value);                    

                    if (!node.selected ) {

                        //processCoordsList(node);

                        //console.log(originNode);

                        parseOrignNode(originNode, node);
                        
                        /*if ( ! result && childrens ) {

                            let items = childrens.filter(e => e.selected || e.pending);

                            node.pending = items.length > 0;                            

                        }*/

                    }

                    if (parent) {

                        if (!parent.selected) {                            

                            //processCoordsList(parent);

                            let originNode = findNode(data, parent.value);        

                             parseOrignNode(originNode, parent);

                            /*if ( !result && parent.childrens ) {

                                let items = parent.childrens.filter(e => e.selected || e.pending);

                                parent.pending = items.length > 0;                                 
                                

                            }*/

                        }

                        parseNodeParent(parent);

                    }

                }

            },            

            chooseItemCallback = (e, i) => {                

                if (e['value'] == v) {

                    e['selected'] = ! e['selected'];
                    e['pending'] = false;

                    processCoordsList(e);

                    parseNodeParent(e);

                }

                if (e['childrens'] && e['childrens'].length > 0) {

                    e['childrens'].map(chooseItemCallback);

                }

                return e;

            }

        filteredItems.map(chooseItemCallback);   

        if (this.props.parent && this.props.variableReturn) {

            const arrLists = [];

            coordsNodesList.map(e => {

                arrLists.push(e.value);

            });

            this.props.parent[this.props.variableReturn] = arrLists;

        }

        this.setState({

            filteredItems: getCopiedJsonObject( filteredItems ),
            coordsNodesList

        });

    }

    handleSelect(value, e) {

        e.preventDefault();                

        this.handleChooseItem(value);       

        if (this.props.handleChooseItemCallback) {

            setTimeout(() => {
                this.props.handleChooseItemCallback(default_value);
            }, 200);

        }

    }

    handleToggleChild(e) {

        e.preventDefault();

        const target = e.currentTarget,
            childList = target.nextElementSibling;

        if (childList.classList.contains('active')) {

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
            {coordsNodesList} = this.state,
            temp_subitems = item.childrens ? item.childrens.map(this.getListItem) :
                                              null;

        let name = item.name,
            key = this.state.searchText;
            
        if ( item.isSearchedResult && key ) {            

            let pos = name.toLowerCase().indexOf(key.toLowerCase());

            //debugger;

            while ( pos !== -1 ) {

                const s = name.substr(pos, key.length);

                name = name.substr(0, pos) + "<s>" + s + "</s>" + name.substr(pos + key.length);

                pos = name.indexOf(key, pos + 1 + 7);

            }

            name = name.replace('<s>', '<strong>')
                       .replace('</s>', '</strong>');
        }

        //
        let coordsNode = null;

        coordsNodesList.map(node => { 

            if ( node.value === item.value ) {

                coordsNode = node;

                return;

            }

            else {

                node.extras && node.extras.map(extra => {

                    if ( extra.value === item.value ) {

                        coordsNode = extra;

                        return;

                    }

                });

            }

        });

        if ( coordsNode ) {

            const coordsNodeSelected = coordsNode.selected,
                   coordsNodePending = coordsNode.pending;

            item.selected = item.selected || coordsNodeSelected;
            item.pending = item.pending || coordsNodePending;

        } 

        let checkbox = '';

        if ( item.selected ) {

            checkbox = 'checked';

        }

        else {

            if ( item.pending ) {

                checkbox = 'dotted';

            }

        }

        return (

            <li
                key={index}
                onClick={this.handleSavePos}
                className='select-item'>

                <a href="#"
                    className={item['selected'] ? 'selected' : ''}
                    onClick={(e) => self.handleSelect(item.value, e)}>

                    <span className={"checkbox ".concat(checkbox)}></span>

                    <span dangerouslySetInnerHTML={{__html: name}}></span>
                    

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

    handleSearchChanged(e) {

        let currentTarget = e.currentTarget,
            v = currentTarget.value,

            filteredList = getCopiedJsonObject(this.state.data),

            nodeLists = [],
            parentValueLists = [],

            findNode = (v) => {

                let searched = null;

                const _findNode = (node) => {

                    if (node.value === v) {

                        searched = node;

                        return;

                    }

                    else {

                        node.childrens && node.childrens.map(_findNode);

                    }

                };

                filteredList.map(_findNode);

                return searched;

            },

            parseNodeItem = (obj) => {

                //console.log(obj.parentValue);

                const parent = obj.parentValue ? findNode(obj.parentValue) : null,
                    node = findNode(obj.value);

                //console.log(parent);

                if (parent) {

                    const items = parent.childrens ?
                        parent.childrens.filter(item => item.name.toLowerCase().includes(obj.key.trim().toLowerCase())) :
                        [];

                    if (items.length > 0) {

                        parent.childrens = items;

                    }

                    else {

                        parent.childrens = [node];

                    }

                    //console.log( parent );

                    parseNodeItem({
                        key: obj.key,
                        value: parent.value,
                        parentValue: parent.parentValue ? parent.parentValue : ''
                    });

                }

                else {

                    const item = parentValueLists.find(v => v === obj.value);

                    if (isUndefined(item)) {

                        parentValueLists.push(obj.value);

                    }



                }

            },

            mapSearchItems = (item) => {

                //console.log(item);

                if (item.name.toLowerCase().includes(v.trim().toLowerCase())) {

                    item.isSearchedResult = true;

                    nodeLists.push({

                        key: v,
                        value: item.value,
                        parentValue: item.parentValue ? item.parentValue : ''

                    });

                }

                else {

                    item.isSearchedResult = false;

                }

                item.childrens && item.childrens.map(mapSearchItems);

            };

        filteredList.map(mapSearchItems);

        nodeLists.forEach(o => {

            parseNodeItem(o);

        });

        filteredList = filteredList.filter(o => parentValueLists.includes(o.value));

        const parseNodeSearched = (item) => {

            if (item.childrens) {

                let items = item.childrens.filter(e => e.childrens || e.isSearchedResult);

                if (items.length > 0) {  

                    item.childrens = items;                                                        

                }

                else {

                    item.childrens = null;

                }

            }

        };

        const mapNodeLists = (item) => {

            if (item.isSearchedResult) {

                if (item.childrens) {

                    parseNodeSearched(item);

                    if ( item.childrens ) {
                    
                        item.childrens.map(e => parseNodeSearched(e));  
                    
                        parseNodeSearched(item);

                    }

                }

            }

            item.childrens && item.childrens.map(mapNodeLists);

        };

        filteredList.map(mapNodeLists);

        this.setState({

            searchText: v,
            filteredItems: getCopiedJsonObject(filteredList)

        });

    }   

    render() {

        const select_lists = [],

            self = this;

        this.state.filteredItems.map((item, index) => {

            select_lists.push(this.getListItem(item, index));

        });

        return (

            <div className='option-lists'>

                <ul className="select-list tree-list">
                    {select_lists}
                </ul>

                <div className="search">

                    <div className="input-group">

                        <span className="input-group-addon">
                            <i className="fa fa-search"></i>
                        </span>

                        <input type="text"
                            className="form-control txtSearch"
                            value={this.state.searchText}
                            onChange={this.handleSearchChanged}
                            placeholder="Tìm kiếm danh mục ..." />

                    </div>

                </div>

            </div>

        );

    }

}

export default CustomTreeList;