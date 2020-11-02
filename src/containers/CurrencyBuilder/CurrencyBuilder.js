import React, { useEffect, useCallback, useState } from 'react';

import './CurrencyBuilder.scss';
import Currency from './../../components/Widgets/Currency/Currency';
import axios from 'axios';
import { SpinnerLine } from './../../components/UI/Spinner/Spinner';
import { epochToDate, fixNumber } from './../../helper/helper';

const CurrencyBuilder = () => {
   const [currency, setCurrency] = useState({
      currency: {
         EUR: '',
         RUB: '',
         USD: '',
         UAH: '',
      },
      showSpinner: true
   });

   const handleXmlData = useCallback(x => {
      const xmlData = {},
         parser = new DOMParser(),
         xml = parser.parseFromString(x, "text/xml"),
         valute = xml.getElementsByTagName('Valute');
      for(let x = 0; x < valute.length; x++) {
         xmlData[valute[x].getElementsByTagName('Name')[0].textContent] = 
         fixNumber(valute[x].getElementsByTagName('Value')[0].textContent);
      }
      setCurrency(prevState => ({
         ...prevState,
         currency: {
            EUR: xmlData['Euro'],
            RUB: xmlData['Rubla ruseasca'],
            USD: xmlData['Dolar S.U.A.'],
            UAH: xmlData['Hrivna ucraineana'],
         }
      }))
   }, []);

   console.log(epochToDate(new Date(),'.'));

   useEffect(() => {
      axios.get('https://cors-anywhere.herokuapp.com/' + `http://www.bnm.md/ro/official_exchange_rates?get_xml=1&date=${epochToDate(new Date(),'.')}`)
      .then( res => {
         setCurrency(prevState =>({
            ...prevState,
            showSpinner: false
         }));
         handleXmlData(res.data);
      }).catch(err => {
         console.log(err);
         setCurrency(prevState =>({
            ...prevState,
            showSpinner: true
         }));
      })
   }, [handleXmlData]);

   return (
      <>
         {currency.showSpinner ? <SpinnerLine/> : <Currency currency={currency.currency}/>}
      </>
   );
};

export default CurrencyBuilder;


