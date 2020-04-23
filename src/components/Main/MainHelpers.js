export const initialState = {
    category:'Global',
    confirmed:0,
    recovered:0,
    deaths:0,
    lastUpdated: '',
    error:''
};


export const reducer = (state,action) => {
    const {type,payload} = action;
    switch(type){
         case 'GOT_CASES':
              return{
                   ...state,
                   category: 'Global',
                   confirmed: payload.confirmed.value,
                   recovered: payload.recovered.value,
                   deaths: payload.deaths.value,
                   lastUpdated: toDateStr(payload.lastUpdated),
              };
         case 'Country_Code':
              return{
                   ...state,
                   category: payload.category,
                   confirmed: payload.res.confirmed.value,
                   recovered: payload.res.recovered.value,
                   deaths: payload.res.deaths.value,
                   lastUpdated: toDateStr(payload.res.lastUpdated),
              }
         case 'Error':
              return{
                   ...state,
                   error: payload
              }
         default:
              throw new Error("Error");
    }
}


export const formatNumberWithCommas = (num) => {
     const the_number = new Number(num);
     return the_number.toLocaleString();
}

export const toDateStr = (date) => {
     return new Date(date).toDateString();

}