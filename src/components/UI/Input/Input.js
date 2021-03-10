import React from "react";
import classes from "./Input.css";
function Input(props) {
  let customInput = null;
  let validationError = null;
  let inputClasses = [classes.CustomInput]
  if(props.inValid && props.shouldValid && props.touched){
    inputClasses.push(classes.Invalid)
  }
 
if (props.inValid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
}
  switch (props.elementType) {
    case "input":
      customInput = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />
          
      );
      break;
    case "textarea":
      customInput = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      customInput = (
        <select className={inputClasses.join(' ')} 
         value={props.value}
         onChange={props.changed}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      customInput = (
        <input
        />
      );
  }
  return (
    <div className={classes.input}>
      <label className={classes.label} htmlFor=""></label>
      {customInput}
      {validationError}
    </div>
  );
}
export default Input;
