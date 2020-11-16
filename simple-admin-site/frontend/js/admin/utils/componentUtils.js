var componentsLoadedList = null;

function getComponentsList() {

    return componentsLoadedList ? componentsLoadedList : [];

}

function getComponentId(name) {       

    return getComponentsList().findIndex(c => c.name.toLowerCase() === name.toLowerCase());
    
}

function saveComponentsList(list) {

    componentsLoadedList = list;

}

export function addComponentInst(c) {

    const componentsList = getComponentsList(),
         component = {
            name : c.name,
            instance : c.instance
         },
         id = getComponentId(c.name);    

    if ( id !== -1  ) {

        componentsList[id] = component;        
        

    } else {

        componentsList.push(component);        

    }

    saveComponentsList(componentsList);

}

export function getComponentInst(name) {    

    return getComponentsList().find(c => c.name.toLowerCase() === name.toLowerCase()).instance;

}