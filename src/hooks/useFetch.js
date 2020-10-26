import React, { useCallback, useState } from 'react';

import axios from 'axios';

const useFetch = () => {
   const [state, setState] = useState({
      data: {},
      loading: false,
      error: false,
      popup: false
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
               popup: true
            }));
         })
         .catch(error => {
            setState( prevState => ({
               ...prevState,
               loading: true,
            }));
         })
   }, []);

   return {
      sendRequest: sendRequest,
      data: state.data,
      loading: state.loading,
      error: state.error,
      popup: state.popup
   }

};

export default useFetch;