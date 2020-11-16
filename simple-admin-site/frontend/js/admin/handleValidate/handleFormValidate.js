import * as _ from 'utils/libUtils';

export function checkFormValidation(form) {

    let targetFields = this.state[form].fields,
        keys = Object.keys(targetFields),
        length = keys.length;

    for ( let i = 0; i < length; i++ ) {

        let field = targetFields[keys[i]];

        if ( field.error ) return false;

    }

    return true;

}

function getMessageErrorHTML(msg) {
    
    return `<span>
                <span class="fa fa-exclamation-circle"></span>
                <span class="padLeft5">${msg}</span>
            </span><br/>`;

} 

function handleValidationOnlyNumber(v) {

    const reg = /^[0-9]+$/ig;

    return v.match(reg);

}

// accept phone number is 10 digits or 11 digits
function handleValidationPhoneNumber(v) {

    const reg = /((09|03|07|08|05)+([0-9]{8, 9})\b)/g;

    return v.match(reg);

}

function handleValidationEmail(v) {

    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

    return v.match(reg);

}

function handleValidationUrl(v) {

    const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig;    

    return v.match(reg);

}

function handleValidationType(errorObj, v, type) {

    let boolValidate = true,

        usernameNotSpecialCharError = errorObj.usernameNotSpecialCharError,
        notUrlError = errorObj.notUrlError,
        notOnlyNumberError = errorObj.notOnlyNumberError,
        notOnlyEmail = errorObj.notOnlyEmail,
        notPhoneNumber = errorObj.notPhoneNumber,
        notDuplicatePassword = errorObj.notDuplicatePasswordError,
        notMatchPassword = errorObj.notMatchPasswordError,        
        adminPasswordError = errorObj.adminPasswordError,
        requiredSpecialCharPasswordError = errorObj.requiredSpecialCharPasswordError,

        errorMessages = [];   

    switch ( type ) {

        case 'url' :

            boolValidate = handleValidationUrl(v);

            if ( ! boolValidate ) errorMessages.push( notUrlError );

            break;

        case 'number' :

            boolValidate = handleValidationOnlyNumber(v);

            if ( ! boolValidate ) errorMessages.push( notOnlyNumberError );

            break;

        case 'email' :

            boolValidate = handleValidationEmail(v);

            if ( ! boolValidate ) errorMessages.push( notOnlyEmail );

            break;

        case 'phone-number' :

            boolValidate = handleValidationPhoneNumber(v);

            if ( ! boolValidate ) errorMessages.push( notPhoneNumber );

            break;
        
        default :

            break;

    }

    if ( ['passwordMatch', 'passwordRetype'].includes(type) ) {

        const o = this.currentTargetRef.dataset.fieldValueMatch,

            isDuplicatePasswordErr = o.trim() === v.trim(),            
            isAdminPasswordErr = v.trim() === 'admin',
            isSpecialCharPassword = () => {

                const reg = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s]).+$/;

                return reg.test( v );

            };            
           
        if ( isAdminPasswordErr ) errorMessages.push( adminPasswordError );
        if ( ! isSpecialCharPassword() ) errorMessages.push( requiredSpecialCharPasswordError ); 

        if ( type === 'passwordMatch' ) {

            if ( isDuplicatePasswordErr ) errorMessages.push( notDuplicatePassword );

        }

        else {

            if ( ! isDuplicatePasswordErr ) errorMessages.push( notMatchPassword );

        }

        return {

            error : errorMessages.length > 0,
            errorMessages : errorMessages

        };

    }

    return { 
        error : ! boolValidate,
        errorMessages : errorMessages
        
    };

}

export function handleFormValidation(form, e) {

    let currentTarget = e.currentTarget,
        v = currentTarget.value,
        field = currentTarget.dataset.field,
        userProfileField = field + 'Field',
        
        validationType = currentTarget.dataset.validationType,

        targetForm = this.state[form],

        targetState = targetForm.fields[userProfileField],
        targetErrorMsg = targetForm.errorMessages,

        requiredError = targetErrorMsg.requiredError,
        minLengthError = targetErrorMsg.minLengthError,
        maxLengthError = targetErrorMsg.maxLengthError,
        requiredNotSpecialCharError = targetErrorMsg.requiredNotSpecialCharError,

        messageError = '',
        isFieldError = false,

        setFieldError = (msg) => {

            isFieldError = true;

            if ( ! Array.isArray( msg ) ) {

                messageError += getMessageErrorHTML(msg);

            }

            else {

                msg.forEach(v => {

                    messageError += getMessageErrorHTML(v);

                });
                
            }

        },

        updateFormState = () => {

            targetForm.formValidate = checkFormValidation.call(this, form);

            const setFormState = {};

            setFormState[form] = targetForm;

            this.setState(setFormState);

        },

        updateFormErrorState = (errorMsg) => {

            targetState.error = true;
            targetState.errorMessage = errorMsg;
                        
            updateFormState.call(this);

        },

        resetFieldError = () => {

            targetState.error = false;
            targetState.errorMessage = '';   

        };

    //console.log( e.currentTarget.dataset );

    if ( v == '' ) {

        setFieldError(requiredError);

    }        

    let minLength = currentTarget.dataset.fieldMinLength, 
        maxLength = currentTarget.dataset.fieldMaxLength,

        isMinLengthErr = false, isMaxLengthErr = false; 

    minLength = ! _.isUndefined( minLength ) ? parseInt( minLength ) : null;
    maxLength = ! _.isUndefined( maxLength ) ? parseInt( maxLength ) : null;

    if ( minLength && ! isNaN( minLength ) ) {

        minLengthError = minLengthError.replace('{n}', minLength); 

    }

    if ( maxLength && ! isNaN( maxLength ) ) {

        maxLengthError = maxLengthError.replace('{n}', maxLength);

    }    

    if ( minLength && ! isNaN( minLength ) ) {      

        isMinLengthErr = v.length === 0 || v.length < minLength;        

        if ( isMinLengthErr ) {

            setFieldError( maxLength ? [minLengthError, maxLengthError] : minLengthError );

        }

    }        

    if ( ! isMinLengthErr && maxLength && ! isNaN( maxLength ) ) {        

        isMaxLengthErr = v.length === 0 || v.length > maxLength;

        if ( isMaxLengthErr ) {            

            setFieldError( minLength ? [minLengthError, maxLengthError] : maxLengthError );

        }

    }

    let notSpecialChar = currentTarget.dataset.fieldNotspecialchar;

    notSpecialChar = notSpecialChar && notSpecialChar.toLowerCase().trim();

    if ( notSpecialChar && notSpecialChar === 'true' ) {

        const reg = /[-;!@#$%^&*()+"':-=`~<>,/?\[\]{}\\|\s]/ig;

        // error
        if ( v.match(reg) ) {

            setFieldError( requiredNotSpecialCharError );

        }

    }

    if ( ! _.isUndefined( validationType ) ) {

        this.currentTargetRef = e.currentTarget;

        const handleObj = handleValidationType.call(this, targetErrorMsg, v, validationType );

        if ( handleObj.error ) {
            
            //console.log( handleObj.errorMessage );

            //return false;            

            setFieldError( handleObj.errorMessages );  
                   

        }        

    }    

    if ( isFieldError ) {

        updateFormErrorState.call(this, messageError);

        return false;

    }

    else {

        resetFieldError();

    }    

    updateFormState.call(this);

}