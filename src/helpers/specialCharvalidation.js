

export const specialCharvalidation = (string) => {

    const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(string)
    
  
}



