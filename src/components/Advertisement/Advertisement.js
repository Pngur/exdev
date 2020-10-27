import React from 'react';
import './Advertisement.scss';
import { AriixWhite }  from './../../assets/image';

const Advertisement = props => (
   <div className="Advertisement-Box">
      <h3 className="Advertisement-Box__Header">МЫ РЕКОМЕНДУЕМ</h3>
      <a className="Advertisement-Link" rel="noopener noreferrer" href="https://shop.ariix.com/OnlineServices/productListingNg/customerShoppingMain?itemCode=" target="_blank">
         <div className="Advertisement">
            <img src={AriixWhite} alt="logo"/>
            <p className="Advertisement__Text">ЗДОРОВЬЕ И КРАСОТА<br/> СКИДКА  15%</p>
         </div>
      </a>
   </div>
);

export default Advertisement;