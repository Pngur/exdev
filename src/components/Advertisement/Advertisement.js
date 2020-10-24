import React from 'react';
import './Advertisement.scss';
import { AriixWhite }  from './../../assets/image';

const Advertisement = props => (
   <a className="Advertisement-Link" href="https://shop.ariix.com/OnlineServices/productListingNg/customerShoppingMain?itemCode=" target="_blank">
      <div className="Advertisement">
         <img src={AriixWhite} alt="logo"/>
         <p className="Advertisement__Text">ЗДОРОВЬЕ И КРАСОТА.<br/> СКИДКА  15%</p>
      </div>
   </a>
);

export default Advertisement;