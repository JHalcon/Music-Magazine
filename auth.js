const RF = document.querySelector("#regform");
var LOG  = document.getElementById("login");
const UP = document.getElementById("userPanel");
const AP = document.getElementById("adminPage");
const LO = document.getElementById("LO");
const RANDOM = document.getElementById("randomSong");
const usermail = document.getElementById("usermail");
auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('users').doc(user.uid).get().then(doc => {
       var UID = user.uid;
       LO.style.display = "block";
       console.log(user.email);
        usermail.innerHTML = user.email;
       if(user.email == "admin@o2.pl"){
        AP.style.display = "block";
        RANDOM.style.display = "none";
        UP.style.display = "none";
        console.log('user logged in: ', user);

       }
       else{
        UP.style.display="block";
        RANDOM.style.display = "block";
        AP.style.display ="none";

       }
      });
      console.log('user logged in: ', user);
      LOG.style.display = "none";
      RG.style.display = "none";
      siBTN.style.display = "none";
    loBTN.style.display = "none";
    } else {
      console.log('user logged out');
      UP.style.display = "none";
      AP.style.display = "none";
      siBTN.style.display = "block";
    loBTN.style.display = "block";
    RG.style.display = 'none';
    LO.style.display = "none";
    usermail.innerHTML =" ";
    }
  })

RF.addEventListener("submit",(e)=>{
e.preventDefault();
const emailR = RF["regemail"].value;
const passwdR = RF["regpassword"].value;
console.log(emailR);
auth.createUserWithEmailAndPassword(emailR, passwdR).then(cred=>
    {console.log("dodano"+cred);
    alert("User created");
    RF.reset();
    RG.style.display = "none";
    auth.signOut().then(()=>{
        alert("Please log in your account");
        location.reload(); 
        })
    LOG.style.display ="block";
    });

});
