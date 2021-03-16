class Song{
    constructor(a,t,c,u){
this.author = a;
this.title = t;
this.categories = c;
this.user = u;
    }
getAuthor(){
    return this.author;
}
getSongName(){
    return this.title;
}
}
class itemsFactory{
    create(type,a,t,c,u){
        if(type=="song")
        return new Song(a,t,c,u);
    }
}
const List = document.querySelector("#lista");
const rS = document.querySelector('#rSong');
const rSBTN = document.querySelector("#randomS");
const delBTN = document.querySelector(".btn btn-danger");
const form = document.querySelector("#addSong");
const SFactory = new itemsFactory();
const subcategoriesSelect = document.querySelector("#subcategories");
subcategoriesSelect.selectedIndex = -1;
//Losowanie

const RS = new RandomSongStrategy();
const SU = new SongForUser();
function getSong(){
SU.getSong(RS);
}
rSBTN.addEventListener("click",getSong);
const SFU = new SongForUser();
function renderList(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let author = document.createElement('span');
    let categories = document.createElement('span');
    let btnDel = document.createElement('button');
    let namebtn = document.createElement('button');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class',"list-group-item");
    let user = doc.data().user;
    name.textContent = "Title "+ doc.data().name;
    author.textContent = " Author: "+doc.data().author;
    categories.textContent = " Categories: "+doc.data().categories;
    btnDel.textContent = "Delete";
    btnDel.setAttribute("class","btn btn-danger");
    namebtn.textContent = "Edit song";
    namebtn.setAttribute("class","btn");
    let editdiv = document.createElement('div');
    editdiv.setAttribute("class","edit-div");
    //div
    let ename = document.createElement('input');
    let eauthor = document.createElement('input');
    let ecategories = document.createElement('input');
    let savebtn = document.createElement('button');
    let close = document.createElement('button');
    let arrayc = doc.data().categories;
    console.log("tablica"+arrayc);
    ename.setAttribute("type","text");
    ename.setAttribute("id","SNInput");
    eauthor.setAttribute("type","text");
    eauthor.setAttribute("id","SAInput");
    ecategories.setAttribute("type","text");
    ecategories.setAttribute("id","SCInput");
    editdiv.setAttribute('data-id', doc.id);
    ename.setAttribute("placeholder","Title"+doc.data().name);
    ename.setAttribute("value",doc.data().name);
    //name.textContent = "Title "+ doc.data().name;
    eauthor.setAttribute("placeholder",doc.data().author);
    eauthor.setAttribute("value",doc.data().author);
    ecategories.setAttribute("placeholder",doc.data().categories);
    savebtn.textContent = "Save";
    savebtn.setAttribute("class","btn");
    savebtn.setAttribute("id","savebtn");
    close.textContent = "Close";
    close.setAttribute("class","btn");
    close.setAttribute("id","close");
   
    

    editdiv.appendChild(ename);
    editdiv.appendChild(eauthor);
    editdiv.appendChild(ecategories);
    editdiv.appendChild(savebtn);
    editdiv.appendChild(close)
    //arrayc.forEach(element => {
        let inpute = document.createElement('input');
        inpute
        let labele = document.createElement('label');
        labele.setAttribute("for",doc.data().categories)
        labele.textContent = doc.data().categories;

    li.appendChild(name);
    li.appendChild(author);
    li.appendChild(categories);
    li.appendChild(btnDel);
    li.appendChild(namebtn);
    li.appendChild(editdiv);
if(user == auth.W){
    List.appendChild(li);
}
    btnDel.addEventListener('click', (e) => {
        console.log("del");
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('songs').doc(id).delete();
    });
    namebtn.addEventListener('click', (e) => {
        let idedit = e.target.parentElement.getAttribute('data-id');
        console.log("edit"+idedit);
        editdiv.style.display = 'block';
        
    });
    savebtn.addEventListener('click', (e) => {
        console.log("save");
        let idedit = e.target.parentElement.getAttribute('data-id');
        let newname = document.getElementById("SNInput").value;
        let newauthor = document.getElementById("SAInput").value;
        console.log(newname);
        db.collection("songs").doc(idedit).set({
            name: newname,
            author:newauthor,
            user: auth.W,
            categories: doc.data().categories,

        })
    });
    close.addEventListener('click', (e) => {
        console.log("close");
        editdiv.style.display = 'none';
    });
}
db.collection('songs').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log("coco"+changes+"snap  "+snapshot);
    var Citer = new ChangesIterator(changes);
    while(Citer.hasNext()){
        let change = Citer.next();
        console.log("ZMIANY"+change.doc.data());
       if(change.type == 'added'){
            renderList(change.doc);
        } else if (change.type == 'removed'){
            console.log("remove me");
            let li = List.querySelector('[data-id=' + change.doc.id + ']');
            List.removeChild(li);
        }
        else if(change.type == 'modified'){
            console.log("change me");
            let lied = List.querySelector('[data-id=' + change.doc.id + ']');
            List.removeChild(lied);
            renderList(change.doc);
        }
    };
});



function toSelect(doc){
    let option = document.createElement('option');
    let selectInput = document.querySelector("#categories");
    let Cname = document.createElement('span');
    option.setAttribute('data-id', doc.id);
    option.setAttribute('name', doc.data().name);
    option.setAttribute('value', doc.data().name);
    console.log(option.name);
    Cname.textContent = doc.data().name;
    option.appendChild(Cname);
    selectInput.appendChild(option);
}
db.collection('categories').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        toSelect(doc);
    });
});
function makeSubmenu(value) {
    subcategoriesSelect.innerHTML="";
    console.log(value)
    if (value.length == 0) document.getElementById("subcategory").innerHTML = "<option></option>";
    else {
        db.collection('categories').where("name", "==",value).get().then((snapshot)=>{
            snapshot.docs.forEach(doc => {
                doc.data().subcategories.forEach(element => {
                   console.log("element"+element);
                   let sc = document.createElement('option');
                   sc.setAttribute('name', element);
                    sc.setAttribute('value', element);
                    sc.textContent = element;
                   subcategoriesSelect.appendChild(sc);
                   subcategoriesSelect.selectedIndex = -1;
                });
            });


        })
        }

    }

function addSongToDatabase(s){
    db.collection('songs').add({
        
        name: s.title,
        author: s.author,
       categories:s.categories,
       user:s.user
    });
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let tempcat = [];
    tempcat.push(form.categories.value);
    tempcat.push(form.subcategories.value);
    console.log("dodajemy");
    alert("Song "+form.sName.value+" added");
    let name = form.sName.value;
    let author  = form.sAuthor.value;
    let user = auth.W;
    console.log(typeof(author));
    var s = SFactory.create("song", author, name,tempcat,user);
    console.log("song:"+s);
    console.log(s.name);
   
    addSongToDatabase(s);
    form.sName.value = '';
    form.sAuthor.value = '';
});
    const input = document.querySelector('#wordToSearch');
    const ul = document.querySelector('ul');
    const liElements = document.querySelectorAll('li');

    function filterSongs() {
      
        console.log("Adad")
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("wordToSearch");
            filter = input.value.toUpperCase();
            table = document.getElementById("lista");
            li = table.getElementsByTagName("li");
    
         
            for (i = 0; i < li.length; i++) {
                console.log(li[i]);
                span= li[i].getElementsByTagName("span")[0];
                span2= li[i].getElementsByTagName("span")[1].textContent.slice(8);
                console.log(span2);
                console.log(span)
                if (span) {
                      txtValue = span.textContent.slice(6)+span2 || span.innerText;
                      if (txtValue.toUpperCase().indexOf(filter) > -1) {
                          li[i].style.display = "";
                      }else {
                          li[i].style.display = "none";
                 }
              }
          }
      }
    input.addEventListener('input', filterSongs)
      const checkf = document.getElementById("checkForm")
    function toCheckbox(doc){
        let input = document.createElement('input');
        let label = document.createElement('label');
        label.setAttribute("for",doc.data().name)
        input.setAttribute('type', "checkbox");
        input.setAttribute('value', doc.data().name);
        input.addEventListener('change', (e) => {
            console.log("zmiana checkbox");
           if(input.checked){
            console.log( e.target.value+"tak")
            checkfilter(e.target.value);
         }
         else{
             console.log("NIE");
             checkfilter("");
         }
        });
        console.log(input.name);
        label.textContent = doc.data().name;
        checkf.appendChild(input);
        checkf.appendChild(label);
        let sca = doc.data().subcategories;
        if(sca){
        sca.forEach(element => {
            let input = document.createElement('input');
            let label = document.createElement('label');
            label.setAttribute("for",element)
            input.setAttribute('type', "checkbox");
            input.setAttribute('value', element);
            input.setAttribute('class', "cat-checkbox");
            label.textContent = element;
            checkf.appendChild(input);
            checkf.appendChild(label);
            input.addEventListener('change', (e) => {
                console.log("zmiana checkbox");
               if(input.checked){
                  console.log( e.target.value+"tak")
                  checkfilter(e.target.value);
               }
               else{
                   console.log("NIE");
                   checkfilter("");
               }
            });
       });
    }
    }
    db.collection('categories').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            toCheckbox(doc);
           
                
            console.log("jhhjfjhf"+doc.data().subcategories);
        });
    });


    function checkfilter(name) {
        console.log("FUNKCJA sie odpala"+name)
            var input, filter, table, tr, td, i, txtValue;
            filter = name.toUpperCase(); 
            console.log(filter+"filter");
            table = document.getElementById("lista");
            li = table.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                console.log(li[i]);
                span= li[i].getElementsByTagName("span")[2];
                console.log(span)
                if (span) {
                      txtValue = span.textContent.slice(11) || span.innerText;
                      console.log("LOLOLO"+txtValue)
                      if (txtValue.toUpperCase().indexOf(filter) > -1) {
                          li[i].style.display = "";
                      }else {
                          li[i].style.display = "none";
                 }
              }
          }
      }

