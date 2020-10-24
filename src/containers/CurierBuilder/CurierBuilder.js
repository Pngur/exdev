import React, { useState, useEffect } from 'react';

import './CurierBuilder.scss';
import Curier from './../../components/emailForms/CurierForm/CurierForm';
import axios from './../../axios-order';
import { createInputConfig } from './../../helper/helper';
import Popup from './../../components/UI/PopUp/Popup';
import Modal from './../../components/UI/Modal/Modal';


const CurierBuilder = () => {
   const [curier, setCurier] = useState({
      curier: {
         username: createInputConfig('input', 'text', 'Ваше имя', '', '' ),
         organization: createInputConfig('input', 'text', 'Организация','', '' ),
         phone: createInputConfig('input', 'text', 'Номер телефона', '', '' ),
         deliveryAddress: createInputConfig('input', 'text', 'Адрес доставки', '', '' ),
         deliveryType: {
            elemType: 'select',
            elemConfig: {
                  options: [
                     {value: '', displayValie: '-'},
                     {value: 'documents', displayValie: 'Документы'},
                     {value: 'parcel', displayValie: 'Посылка'},
                  ],
                  label: 'Тип отправления'
            },
            value: ''
         },
         weight: createInputConfig('input', 'text', 'Вес', '', '' ),
         email: createInputConfig('input', 'email', 'Email', '', '' ),
         message: createInputConfig('input', 'text', 'Комментарий','', '' ),
      },
      isValid: true,
      showModal: false
   });
   useEffect(() => {
      window.scrollTo(0 , 0);
   }, []);

   const handleValidation = data => {
      let arrKeys = Object.keys(data).length,
          idx,
          isValid = true;
          if (arrKeys === 0)  isValid = false;
          for (idx in data) {
            if (data[idx].value === '' ) {
               isValid = false;
            }
         } 
      return isValid;
   };

   const handleChange = (e, key) => {
      let cloneData = {...curier.curier};
      cloneData[key].value = e.target.value;

      setCurier(prevState => ({
         ...prevState,
         curier: {
            ...cloneData,
         }
      }))
   };

   const resetData = () => {
      const Form = document.querySelector('#form-curier');
      let cloneData = {...curier.curier},
      key;
      for (key in cloneData) {
         cloneData[key].value = '';
      }
      Form.reset();
      setCurier(prevState => ({
         ...prevState,
         curier: {
            ...cloneData
         }
      }));
   };

   const handleSubmit = e => {
      // e.preventDefault();  
      let isValid = handleValidation(curier.curier);
      setCurier(prevState =>({
         ...prevState,
         isValid: isValid
      }));

      if (isValid) {
         let key,
             data = {
               "subject": "REQUEST_DELIVERY",
         };
             
         for (key in curier.curier) {
            data[key] =  curier.curier[key].value;
         }
         
         axios.post('/emails', data)
         .then(response => {
            setCurier(prevState => ({
               ...prevState,
               showModal: true
            }));
         })
         .catch(error => {
         })
      }
   };
   console.log(curier);

   const handleClose = () => {
      resetData();
      setCurier(prevState => ({
         ...prevState,
         showModal: false,
      }));
   };

   return (
      <div className="CurierBuilder">
         <Curier 
            elemConfig={curier.curier} 
            handleChange={(event, key) => handleChange(event, key)}
            handleSubmit={handleSubmit}
            isValid={curier.isValid}
            id='form-curier'
         />
         <Modal show={curier.showModal} close={handleClose}>
            <Popup text='Сообщение отправлено'/>
         </Modal>
      </div>
   );
};

export default CurierBuilder;