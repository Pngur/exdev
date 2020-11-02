import React, { forwardRef } from 'react';

import styles from './Input.module.scss';
import InputMask from 'react-input-mask';

const Input = forwardRef((props, ref) => {
   let fieldType = null;
   switch(props.elemtype) {
      case('input'): fieldType =
         <>
             <label className="InvoiceForm__Label">{props.elemConfig.label}</label>
            <input
               type={props.elemConfig.inpType} 
               ref={ref}
               name={props.name}
               className={styles[props.inpStyle]}
               placeholder={props.elemConfig.placeholder} 
               onChange={props.addChangeHandle  ? event => props.onChangeHandler(event) : null}
               onBlur={props.addBlurHandle ? event =>props.onBlurHandler(event) : null}
               disabled={props.disabled}
               defaultValue={props.defaultValue}
               autoComplete='on'
            />
         </>
      break;
      case('textarea'): fieldType =
         <>
            <label className="InvoiceForm__Label">{props.elemConfig.label}</label>
            <textarea
               className={styles.TextArea}
               type={props.elemConfig.inpType} 
               placeholder={props.elemConfig.placeholder} 
               onChange={props.addChangeHandle  ? event => props.onChangeHandler(event) : null}
               defaultValue={props.defaultValue}
            />
         </>
      break;
      case('input-mask'): fieldType =
         <>
            <label className="InvoiceForm__Label">{props.elemConfig.label}</label>
            <InputMask
               mask="99-99-9999" 
               maskChar='_'

               name={props.name}
               alwaysShowMask={true}
               type={props.elemConfig.inpType} 
               className={styles[props.inpStyle]}
               onChange={props.addChangeHandle  ? event => props.onChangeHandler(event) : null}
               onBlur={props.addBlurHandle ? event =>props.onBlurHandler(event) : null}
               autoComplete={props.autoComplete}
               disabled={props.disabled}
               value={props.defaultValue}
            />
         </>
      break;
 
      case('select'): fieldType =
         <>
         <label className="InvoiceForm__Label">{props.elemConfig.label}</label>
            <select
               name={props.name}
               className={styles[props.inpStyle]}
               onChange={props.addChangeHandle  ?  props.onChangeHandler : null}
               value={props.defaultValue}
            >
               {props.elemConfig.options.map(el => (
                  <option
                     key={el.value}
                     value={el.value}
                  >
                     {el.displayValie}   
                  </option>

               ))}
            </select>
         </>
      break;   
      default:  fieldType = <input />         
   }
      
   return (     
      <>    
         {fieldType}
      </>
)});

export default Input;