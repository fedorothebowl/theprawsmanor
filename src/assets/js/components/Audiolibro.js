export default () => {
  return {

    url: "/json/audiolibro.json",
    books: [],
    loader: true,
    numOfPosts: undefined,
    currentIndex: 0,
    hideBtn: false,
    statusAvanzamento:0,
    howManyBooks : 6,

    async init() {

        this.initLocalStorage(this.getLocalStorage());
        this.statusAvanzamento = this.getLocalStorage();
        this.currentIndex = this.statusAvanzamento;
        await this.loadPosts(this.howManyBooks, 0);
        this.openNext();

        document.addEventListener('endAudio', (e) => {
            this.statusAvanzamento = e.detail.index + 1;
            this.setLocalStorage(this.statusAvanzamento);
            setTimeout(() => {
                this.openNext();
            }, 800);
        });

    },    

    async loadPosts(num, indexStart) {
        try {
            this.loader = true;
            
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error("Errore nella richiesta!");
            }
            
            const data = await response.json();
            for (let index = indexStart; index < indexStart + num; index++) {
                if (data[index]) {
                    this.books.push(data[index]);
                } else {
                    this.hideBtn = true;
                }
            }
            this.numOfPosts = data.length;
            
            // Aggiorna il loader dopo un certo tempo
            setTimeout(() => {
                this.loader = false;
            }, 500);
        } catch (error) {
            console.error(error);
            // Gestisci eventuali errori qui
        }
    },
    
    openBook(index){
        this.setLocalStorage(index);
        this.statusAvanzamento = index;
        this.closeAllBooks();
        this.$el.classList.add('active');
        this.$el.classList.add('opacity-100');
    },

    closeAllBooks(){
        // document.querySelectorAll("audio").forEach(audio=>{
        //     audio.pause();
        // })
        document.querySelectorAll('[data-book]').forEach(el=>{
            el.classList.remove('active');
            el.classList.remove('opacity-100');
        });
    },


    async openNext(){
        if(this.currentIndex <= this.statusAvanzamento ){
            await this.openNextCapter();
            this.openNextBook(this.statusAvanzamento);
        }else{
            this.openNextBook(this.statusAvanzamento);
        }
    },

    async openNextCapter(){
        let index = 0;
        const loops = parseInt(this.getLocalStorage() / this.howManyBooks);

        while(loops > index){
            await this.loadPosts(this.howManyBooks, this.currentIndex);
            index++;
        }    

    },

    openNextBook(index){
        this.closeAllBooks();
        document.querySelectorAll('[data-book]')[index].classList.add("active");
    },

    initLocalStorage(status){
        localStorage.setItem('avanzamentoAudiolibro', 0);
        this.setLocalStorage(status);
    },

    setLocalStorage(status){
        localStorage.setItem('avanzamentoAudiolibro', status);
    },

    getLocalStorage(){
        return (localStorage.getItem('avanzamentoAudiolibro') ? parseInt(localStorage.getItem('avanzamentoAudiolibro')) : 0);
    },

    loadMore: {
      ["@click"]() {
        this.loadPosts(this.howManyBooks, this.currentIndex);
      },
    },

  };
};
