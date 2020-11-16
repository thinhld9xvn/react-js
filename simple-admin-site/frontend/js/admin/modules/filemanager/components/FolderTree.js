import React from "react";

import {onClick_ChooseFolder, 
        onBlur_RenameDirName, 
        onKeyPress_RenameDirName,
        onContextMenu_ShowContextMenu}  from 'handleEvents/fileManagerHandleEvents';

class FolderTree extends React.Component {    

    render() {   
        
        // get Folders Tree
        let parent = this.props.parent,
            folder_nodes = [],
            getAllFoldersNode = (node, i) => {

                const temp_subitems = node.children.length > 0 ? 
                                    node.children.map(getAllFoldersNode) :
                                    null;

                return (

                    <div key={node.path} className={"tree-leaf ".concat(node.edit_mode ? "treenode-edit-mode" : "" )}>
        
                        <div className={"tree-leaf-content ".concat(node.active ? "active" : "")
                                                            .concat(" ", node.disabled ? "disabled" : "")}
                             data-item={JSON.stringify(node)}
                             data-contextmenu="folder"
                             onClick={! node.edit_mode ? onClick_ChooseFolder.bind(parent) : null}
                             onBlur={node.edit_mode ? onBlur_RenameDirName.bind(parent) : null}
                             onKeyPress={node.edit_mode ? onKeyPress_RenameDirName.bind(parent) : null}
                             onContextMenu={onContextMenu_ShowContextMenu.bind(parent)}>
        
                            <div className={"tree-expando ".concat(node.children.length === 0 ? 'hidden' : '' )}>+</div>
                            <div className={"tree-leaf-text ".concat(node.edit_mode ? 'tree-node-editing' : '')} 
                                 contentEditable={node.edit_mode.toString()}
                                 suppressContentEditableWarning={true}>
                                 {node.name}
                            </div>
        
                        </div>

                        {
                            node.children.length > 0 ? (

                                <div className="tree-child-leaves">

                                    {temp_subitems}

                                </div>

                            ) : null                
                        }
        
                    </div>

                );                      

            };

            this.props.data.map((node, i) => {

                folder_nodes.push(getAllFoldersNode(node, i));

            });   

        return( <div id="jfolder_tree">{folder_nodes}</div> )

    }

}

export default FolderTree;