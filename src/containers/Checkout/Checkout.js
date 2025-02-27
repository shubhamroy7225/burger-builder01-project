import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to='/' />
        if(this.props.ings){
            summary=(
                <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.totalPrice} {...props} />)} />
            </div>
            )
        }
        return summary
    }
}
const mapStateToProps = (state) => {
    return {
      ings: state.burgerBuilderReducer.ingredients,
      totalPrice:state.burgerBuilderReducer.totalPrice,
    };
  };

export default connect(mapStateToProps)(Checkout);