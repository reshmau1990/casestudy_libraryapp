let email = document.getElementById("email");
let pwd = document.getElementById("password");
let error = document.getElementById("error");
let message = document.getElementById("message");
let display = document.getElementById("display");

function validate(){

    let regexp1 = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)[.]([a-z]{2,3})(.[a-z]{2,3})?$/;
    
    let regexp2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(email.value.trim() !="" && pwd.value.trim() !=""){
        
        if(regexp1.test(email.value)){
            error.innerHTML = "";

            if(pwd.value.length<8){
              message.innerHTML = "**Password length must be atleast 8 characters";
              message.style.color = "red";
              return false;
            }

                else if(regexp2.test(pwd.value)){
                 return true;
                }
    

                    else {
                        message.innerHTML = "**Password length must be atleast 8 characters, at least one uppercase, and one lower case, must contain at least one number";
                        message.style.color = "red";
                        return false;
                    }
        }
        else {
          error.innerHTML = "Invalid email-id";
          error.style.color = "red";
          return false;
        }
    
    }
    else{
        display.innerHTML = "**Fields cannot be empty";
        display.style.color = "red";
        return false;
    }
}

