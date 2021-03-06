import React, { useState, useRef, useEffect} from 'react';

import './OrderBuilder.scss';
import axios from './../../axios-order';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/OrderSummary/OrderSummary';
import Form from './../../components/UI/Form/Form';
import Input from './../../components/UI/Input/Input';
import useFetch from './../../hooks/useFetch';

const OrderBuilder = props => {
   const [orderState, setOrderState] = useState({
      errorMessage: {
         emptyField: "Заполните поле",
         noResult: "Нет данных по номеру"
      },
      elemConfig: {
         inpType: 'text',
         placeholder: 'поиск накладной',
      },
      value: '',
      searchResult: {},
      showModal: false,
      isValid: true,
      displayErrorText: ''
   });
   const { sendRequest, resetState, data, loading, error, popup, isValid} = useFetch();
  
   const inputRef = useRef();
   const checkValidityHandler = event => {
      let value = event.target.value;
      let isValid = value.trim() !== '' && true;
      setOrderState( prevState => {
         return {
            ...prevState,
            isValid: isValid,
            value: value
         }
      });
   };

   const closeOrderTableHandler = () => {
      resetState();
      setOrderState( prevState => {
         return {
            ...prevState,  
            searchResult: {}, 
            showModal: false,
            isValid: true
      }});
   }

   const inputOnFocusHandler = () => {
      setOrderState( prevState => {
         return {
            ...prevState,
            showModal: false,
            isValid: true,
         }
      });
   };

   const orderHandler = e => {
      e.preventDefault();
      let isFormValid = orderState.isValid;
      if (orderState.value === '') {
         isFormValid = false;
         inputRef.current.focus();
         setOrderState(prevState => {
            return {
               ...prevState,
            showModal: prevState.showModal,
            isValid: false,
            displayErrorText: orderState.errorMessage.emptyField
         }});
      };

      if (isFormValid) {
         sendRequest('get', `https://exmoto.herokuapp.com/api/v1/deliveries/${orderState.value}`);

         // axios.get(`/deliveries/${orderState.value}`)
         // .then(response => {
         //    setOrderState( prevState => {
         //       return {
         //          ...prevState,
         //          showModal: true,
         //          isValid: true,
         //          searchResult: {...response.data.data.delivery}
         //       }
         //    });
         // })
         // .catch(error => {
         //    setOrderState( prevState => {
         //       return {
         //          ...prevState,
         //          showModal: false,
         //          isValid: false,
         //          displayErrorText: orderState.errorMessage.noResult
         //       }
         //    });
         // })
      };
   };

   useEffect(() => {
      console.log(loading);
      if(!loading) {
         setOrderState(prevState => ({
            ...prevState,
            showModal: popup,
            isValid: isValid,
            searchResult: {...data.delivery}
         }))
      }
   }, [loading]);

   console.log(orderState.searchResult);
   return (
      <div className={props.class}>
         <Form 
            onSubmitHandler={event => orderHandler(event)}
            isValid={orderState.isValid}
            errText={orderState.displayErrorText}
            btnText='поиск'
            btnStyle='Button__GreenSearch'
            formStyle='FormBox'
         >
           <Input 
               elemtype='input'
               elemConfig={orderState.elemConfig}
               inpStyle='Search-Input'
               ref={inputRef}
               onChangeHandler={event => checkValidityHandler(event)}
               onBlurHandler={inputOnFocusHandler}
               addChangeHandle={true}
               addBlurHandle={true}
            />     
         </Form>
         <Modal show={orderState.showModal} close={closeOrderTableHandler}>
            <OrderSummary searchResult={orderState.searchResult}/>
         </Modal>
       </div>
   ); 
}

export default OrderBuilder;