class Login {
    constructor() {  
      const loginForm = document.querySelector('#login-form');
      this.doLogin = this.doLogin.bind(this);
      loginForm.addEventListener('submit', this.doLogin);

      const registerForm = document.querySelector('#register-form');
      this.doRegister = this.doRegister.bind(this);
      registerForm.addEventListener('submit', this.doRegister);
    }

    doRegister(event) {
      const setuser = document.querySelector("#registrousername").value;
      const setpass = document.querySelector("#registropassword").value;
  
      const key = "Programacion III - AWI";
      const encryptedRegisterUsername = CryptoJS.AES.encrypt(setuser, key).toString();
      const encryptedRegisterPassword = CryptoJS.AES.encrypt(setpass, key).toString();
  
      const registerBody = {
          username: encryptedRegisterUsername,
          password: encryptedRegisterPassword
      };
      
      const fetchOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerBody)
      };
  
      fetch('/register/', fetchOptions)
          .then(response => {
              if (response.ok) {
                  alert("¡Registro exitoso! Ahora puedes iniciar sesión!");
              } else {
                  alert("¡Hubo un problema durante el registro!");
              }
          })
          
      event.preventDefault();
  }

async doLogin(event) {
        event.preventDefault();
        const Loguser = document.querySelector("#username").value;
        const Logpass = document.querySelector("#password").value;
     
        const key = "Programacion III - AWI";
        const encryptedLoginUsername = CryptoJS.AES.encrypt(Loguser, key).toString();
        const encryptedLoginPassword = CryptoJS.AES.encrypt(Logpass, key).toString();

        const loginBody = {
            username: encryptedLoginUsername, 
            password: encryptedLoginPassword
        };
        const fetchOptions = {
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           body: JSON.stringify(loginBody)
        };
        
        console.log(loginBody);
        
        return fetch('/login/', fetchOptions)
            .then(user =>   window.location.href = '/');
    }

}
new Login();
