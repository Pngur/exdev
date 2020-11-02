import  { useCallback, useState } from 'react';

import axios from 'axios';

const useFetch = () => {
   const [state, setState] = useState({
      data: {},
      loading: true,
      error: false,
      popup: false,
      isValid: false
   }); 
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
               loading: false,
               isValid: false
            }));
         })
   }, []);
   const resetState = () => {
      setState({
         data: {},
         loading: true,
         error: false,
         popup: false,
         isValid: false
      })
   }
   return {
      sendRequest: sendRequest,
      resetState: resetState,
      data: {...state.data},
      loading: state.loading,
      error: state.error,
      popup: state.popup,
      isValid: state.isValid,
   }

};

export default useFetch;