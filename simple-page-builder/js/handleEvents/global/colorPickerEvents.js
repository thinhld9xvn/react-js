import * as _ from 'libraries/libUtils';

export function OnClick_ColorPickerToggleState(field, e) {

    e.preventDefault();

    const settings = _.getCopiedJsonObject( this.state.settings ),
          colorPicker = settings[field];

    colorPicker.display = ! colorPicker.display;
   
    this.setState({ settings : _.getCopiedJsonObject(settings) });

}

export function OnClick_ColorPickerClose(field, e) {

    e.preventDefault();

    const settings = _.getCopiedJsonObject( this.state.settings ),
          colorPicker = settings[field];

    colorPicker.display = false;

    this.setState({ settings : _.getCopiedJsonObject(settings) });

}

export function OnChange_ColorPickerChooseColor(field, handlePreview, color, e) {

    e.preventDefault();

    const settings = _.getCopiedJsonObject( this.state.settings ),
          colorPicker = settings[field];

    colorPicker.color = color.rgb;

    this.setState({ settings : _.getCopiedJsonObject(settings) }, () => {

        handlePreview.call(this);

    });    

}
