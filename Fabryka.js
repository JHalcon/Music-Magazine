
class Song{
    constructor(a,t,c,u){
this.author = a;
this.title = t;
this.categories = c;
this.user = u;
    }
getAuthor(){
    return this._author;
}
getSongName(){
    return this._title;
}
}
class itemsFactory{
    constructor(){
    if(!itemsFactory.instance){
        itemsFactory.instance = this
      }
   
      return itemsFactory.instance
     }
   
    create(type,n,a,c,u){
        if(type=="song")
        return new Song(n,a,c,u);
    }
}
