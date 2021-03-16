class Iterator{
    constructor(collection)
    {
      this.collection = collection
      this.index = 0
    }
    hasNext(){};
    next(){};
    currentItem(){};
}
class CollectionIterator extends Iterator{
    constructor(collection)
    { super(collection);
        this.collectionArray = collection.docs;
    }
    hasNext()
    {
      return this.index < this.collectionArray.length;
    }
    next()
    {
      return this.collectionArray[this.index++]
    }
    currentItem(){
      return this.collectionArray[this.index];
    }
}
class ChangesIterator extends Iterator{
    constructor(collection)
    { super(collection);
        this.collectionArray = collection;
    }
    hasNext()
    {
      return this.index < this.collectionArray.length;
    }
    next()
    {
      return this.collectionArray[this.index++]
    }
    currentItem(){
      return this.collectionArray[this.index];
    }
}