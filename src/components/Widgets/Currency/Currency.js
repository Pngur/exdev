import React from 'react';
import './Currency.scss';

const Currency = props => {
   return (
      <div className="Currency">
         <div className="Currency-Box">
            <div className="Currency-Box__LeftSide">
               <div className="Currency-Box__Type">
                  <span className="Currency-Box__Heading">EUR:</span>
                  <span  className="Currency-Box__Value">{props.currency.EUR}</span>
               </div>
               <div className="Currency-Box__Type">
                  <span className="Currency-Box__Heading">RUB:</span>
                  <span  className="Currency-Box__Value">{props.currency.RUB}</span>
               </div>
            </div>
            <div className="Currency-Box__RightSide">
               <div className="Currency-Box__Type">
                  <span className="Currency-Box__Heading">USD:</span>
                  <span  className="Currency-Box__Value">{props.currency.USD}</span>
               </div>
               <div className="Currency-Box__Type">
                  <span className="Currency-Box__Heading">UAH:</span>
                  <span  className="Currency-Box__Value">{props.currency.UAH}</span>
               </div>
            </div>
         </div>
      </div>
   );
  
};

export default Currency;