
export const encodeParamsForUrl=(params)=> {
  return Object.entries(params).map(([key, value]) => 
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  ).join('&');
}