import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false,
        valueType:'name',
        isError:''
      },
      email: {
        elementType: "input",
        elementConfig: {
          text: "email",
          placeholder: "Your email",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false,
        valueType:'email',
        isError:''
      },

      street: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Street",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false,
        valueType:'street',
        isError:''
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Zipcode",
        },
        value: "",
        validation:{
          required:true,
          minLength:5,
          maxLength:5
        },
        valid:false,
        touched:false,
        valueType:'zipcode',
        isError:''
      },
      country: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Country",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched:false,
        valueType:'country',
        isError:''
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "fastest",
            },
            {
              value: "cheapest",
              displayValue: "cheapest",
            },
          ],
        },
        value: "",
        validation:{},
        valid:true
      },
    },
    formIsValid:false,
    loading:false
  };
  checkValidity = (value,rules)=>{
     let isValid = true
      if( rules.required){
        isValid = value.trim() !== '' && isValid
      }
      if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
      }
      if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
      }
      return isValid
  } 

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const users = {}
    for(let user in this.state.orderForm){
        if(users[user] === 'deliveryMethod'){
            users[user] = this.state.orderForm.user.options.value
        }else{
        users[user] = this.state.orderForm[user].value
        }
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      userDetail:users
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  inputHandler = (event, formIdentifier) => {
    const newOrdeForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...newOrdeForm[formIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
    updatedFormElement.touched=true
    newOrdeForm[formIdentifier] = updatedFormElement;
    let formIsValid = true
    for(let inputIdentitier in newOrdeForm){
      formIsValid = newOrdeForm[inputIdentitier].valid && formIsValid
    }
    this.setState({ orderForm: newOrdeForm,formIsValid:formIsValid });
  };

  render() {
    let formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            shouldValid={formElement.config.validation}
            touched={formElement.config.touched}
            valueType={formElement.config.valueType}
            changed={(event) => this.inputHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
