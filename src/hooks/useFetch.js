import  { useCallback, useState } from 'react';

import axios from 'axios';

const useFetch = () => {
   const [state, setState] = useState({
      data: {},
      loading: false,
      error: false,
      popup: false,
      isValid: false
   }); 
// console.log(state);
   const sendRequest = useCallback((method, url) => {
      axios({
         method: method,
         url: url
      })
         .then(response => {
            setState( prevState => ({
               ...prevState,
               data: {...response.data.data},
               loading: false,
               popup: true,
               isValid: true
            }));
         })
         .catch(error => {
            setState( prevState => ({
               ...prevState,
               loading: true,
               isValid: false
            }));
         })
   }, []);

   return {
      sendRequest: sendRequest,
      data: {...state.data.delivery},
      loading: state.loading,
      error: state.error,
      popup: state.popup,
      isValid: state.isValid
   }

};

export default useFetch;