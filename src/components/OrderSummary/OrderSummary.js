import React from 'react';

import './OrderSummary.scss';
import { epochToDate } from './../../helper/helper';


const OrderSummary = props => (
   <ul  className='OrderSummary__List'>
      <li  className="OrderSummary__Header-Row">
         <div  className="OrderSummary__Header-Col">номер</div>
         <div  className="OrderSummary__Header-Col">откуда</div>
         <div className="OrderSummary__Header-Col">куда</div>
         <div  className="OrderSummary__Header-Col">расчётная<br/> дата доставки</div>
         <div  className="OrderSummary__Header-Col">статус</div>
         {props.searchResult.recipient ? <div  className="OrderSummary__Header-Col">{'Получил(а)'}</div> : null}
      </li> 
      <li className="OrderSummary__Body-Row">
         <div className="OrderSummary__Body-Col OrderSummary__Body-Col--1">{props.searchResult.trackingNumber}</div>
         <div className="OrderSummary__Body-Col">{props.searchResult.fromCountry},<br/>{props.searchResult.fromCity}</div>
         <div className="OrderSummary__Body-Col">{props.searchResult.toCountry},<br/> {props.searchResult.toCity}</div>
         <div className="OrderSummary__Body-Col">{epochToDate(props.searchResult.estimatedDeliveryDate, '-')}</div>
         <div className="OrderSummary__Body-Col">{props.searchResult.delivered ? 'Доставлено' : 'В пути' }</div>
         {props.searchResult.recipient ? <div className="OrderSummary__Body-Col">{props.searchResult.recipient}</div> : null}
      </li> 
   </ul>
);

export default OrderSummary;

