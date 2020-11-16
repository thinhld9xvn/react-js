import * as _ from 'libraries/libUtils';

export function handleTextFieldChanged(field, handlePreview, e, newValue) {  

    const settings = _.getCopiedJsonObject(this.state.settings),
          val = newValue;

    settings[field] = val;

    this.setState({ settings : _.getCopiedJsonObject(settings) }, () => {

        handlePreview.call(this);

    });    

}

export function handleSpinButtonControlChanged(data, action, field, handlePreview, value) {  

    const settings = _.getCopiedJsonObject(this.state.settings),
          { min, max, step } = data;

    if ( action === 'increment' ) {

        if ( Number(value) + step > max ) {

            value = String(+value);
            
        }

        else {

            value = String(+value + step);
            
        }

    }

    else {

        if ( Number(value) - step < min ) {

            value = String(+value);
            
        }

        else {

            value = String(+value - step);
            
        }

    }

    settings[field] = value;  

    this.setState({ settings : _.getCopiedJsonObject(settings) }, () => {

        handlePreview.call(this);

    });    

}

export function handleGroupChoiceChanged(field, handlePreview, e, option) {  

    const settings = _.getCopiedJsonObject(this.state.settings);

    settings[field] = option.key;   

    this.setState({ settings : _.getCopiedJsonObject(settings) }, () => {

        handlePreview.call(this);

    });    

}

export function handleDropDownChanged(field, handlePreview, e, option) {  

    handleGroupChoiceChanged.call(this, field, handlePreview, e, option);

}
