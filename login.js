const login = document.querySelector("#LI");
const logout = document.querySelector("#LO");
const logform = document.querySelector("#logform");
logout.addEventListener("click",(e)=>{
e.preventDefault();
auth.signOut().then(()=>{
alert("User logged out");
location.reload(); 
})
})
logform.addEventListener("submit",(e)=>{
    e.preventDefault();
   const  email = logform["email"].value;
   const  password = logform["password"].value;
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);
        alert("User logged in");
        logform.reset();
        LOG.style.display ="none";
        location.reload(); 
      }).catch(err => {
       alert("Error - wrong email or password!");
      });;
    })
    


