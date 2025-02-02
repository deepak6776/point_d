export const filterFormikErrors = <T extends object>(
  errors: T, 
  touched: { [key: string]: boolean }, 
  values: T
) => {
  const touchedKeys = Object.entries(touched).map(([key, value]) => {
      if (value) return key;
  });


  // console.log(touchedKeys);


  const finalErrors: string[] = [];

  Object.entries(errors).forEach(([key, value]) => {
      if (touchedKeys.includes(key) && values) finalErrors.push(value)
  });

  const formErrors: string[] = finalErrors;

  return finalErrors;
}