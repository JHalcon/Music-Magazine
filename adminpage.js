const ASC = document.getElementById("addSC");
const SCspan = document.getElementById("SCspan");
const formCat = document.getElementById("formCat");
function addSubcat(){
    let input = document.createElement('input');
    input.setAttribute("type","text");
    input.setAttribute("class","subcat");
    SCspan.appendChild(input);

}
ASC.addEventListener("click", function(e){
e.preventDefault();
console.log("subcat");
addSubcat();
});
formCat.addEventListener('submit', (e) => {
    e.preventDefault();
    var tempcat = formCat.category.value;
    let subcats = document.getElementsByClassName("subcat");
    var tmpsubcats = [];
    console.log(tempcat);
    console.log("dodajemy kategorie");
    let i;
  for (i = 0; i < subcats.length; i++) {
            tmpsubcats[i] = subcats[i].value;
} 
    db.collection('categories').add({
        name: tempcat,
       subcategories:tmpsubcats,
    });
    formCat.reset();
    SCspan.innerHTML="";
    console.log("dodano kategorie");
});