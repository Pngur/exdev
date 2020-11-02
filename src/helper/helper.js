export const getEpochTime = (date) => {
   const reverseDate = date.split('-').reverse().join('-');
   const epochDate = new Date(reverseDate);
   return epochDate.getTime();
};

export const epochToDate = (epoch, separ) => {        
   const date = new Date(epoch);
   // console.log(date.date.getMonth() + 1);
   // console.log(`${('0' + date.getDate()).slice(-2)}${separ}${('0' + date.getMonth() + 1).slice(-2)}${separ}${date.getFullYear()}`);
   return `${('0' + date.getDate()).slice(-2)}${separ}${('0' + (date.getMonth()+1)).slice(-2)}${separ}${date.getFullYear()}`;
}

// Конфигурация Input
export const createInputConfig = (elemType, inpType, label, placeholder, disabled) => ({
   elemType: elemType,
   disabled: disabled,
   value: '',
   elemConfig: {
      inpType: inpType,
      label: label,
      placeholder: placeholder,
   }
});

// Оставляет 2 цифры после запятой
export const fixNumber = nmb => {
   return Math.floor(nmb * 100) / 100;
};