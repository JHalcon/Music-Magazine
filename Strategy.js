class SongForUser{
    getSong(Strategy){
        Strategy.getSong();
    }
    }
    
    class RandomSongStrategy{
        getSong(){
            rSong.innerHTML ="";
            const tmpTab =[];
            var i =0;
        var songs = db.collection("songs");
        var key = songs.doc().id;
        var indexes = [];
        var i =0;
    db.collection('songs').where("user","==",auth.W).get().then(snapshot => {
        console.log("rozmiar tego recordu"+snapshot.size);
        var size = snapshot.size;
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            console.log("Rozmiar to"+size);
            console.log("1. i ma rozmiar "+i);
            indexes[i] = doc.data().author+" - "+doc.data().name;
            console.log("tablica dodaje"+indexes[i]);
            ++i;
            console.log("i teraz"+i);
            if(i==size){
               console.log("TAK")
                const numberOfSongs = size;
                const randomIndex = Math.floor(Math.random() * numberOfSongs);
                console.log("piosenka"+indexes[randomIndex]);
                console.log("randomowy ondex to  "+ randomIndex);
                let song = document.createElement('p');
                song.textContent = "Song for You: "+indexes[randomIndex];
                console.log("losuje"+song)
                rSong.appendChild(song);
            }
        });
    });
        }
    }