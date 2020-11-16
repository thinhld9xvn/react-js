import React, { Component } from 'react';

class FileContextMenu extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        const context_menu = [];

        this.props.data.map(e => {

            context_menu.push(

                <li key={e.command}>

                    <a className={"file ".concat(e.command)
                                         .concat(e.disabled ? ' disabled' : '')}
                        href="#" 
                        arial-control="contextmenu"
                        arial-command={e.command}
                        onClick={this.props.onClick_PerformContextMenuAction}>

                            <span className="icon"></span>
                            <span className="name">{e.text}</span>

                    </a>

                </li>
                
            );

        });

        const style_obj = {

            top : this.props.context_menu.Y + 'px',
            left : this.props.context_menu.X + 'px'

        };

        return (

            <ul className={"fm-context-menu ".concat(this.props.context_menu.show ? 'active' : '')}
                style={this.props.context_menu.show ? style_obj : null}
                id="fm-context-menu-file">

                {context_menu}
            
            </ul>

        );

    }
}

export default FileContextMenu;