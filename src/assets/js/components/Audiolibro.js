export default () => {
  return {

    url: "/json/audiolibro.json",
    books: [],
    loader: true,
    numOfPosts: undefined,
    currentIndex: 0,
    hideBtn: false,
    statusAvanzamento:0,

    async init() {
        
        await this.openNext();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.addEventListener('endAudio', (e) => {
            this.statusAvanzamento = e.detail.index + 1;
            setTimeout(() => {
                this.closeBook();
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
            
            this.numOfPosts = data.length - 1;
            
            // Aggiorna il loader dopo un certo tempo
            setTimeout(() => {
                this.loader = false;
            }, 500);
        } catch (error) {
            console.error(error);
            // Gestisci eventuali errori qui
        }
    },
    

    openBook(){
        this.closeBook();
        this.stopAudio();
        this.$el.classList.add('active');
        this.$el.classList.add('opacity-100');
    },

    closeBook(){
        document.querySelectorAll('[data-book]').forEach(el=>{
            el.classList.remove('active');
            el.classList.remove('opacity-100');

        });
    },

    stopAudio(){
        document.querySelectorAll("audio").forEach(el=>{
            el.pause();
        })
    },

    async openNext(){
        if(document.querySelectorAll('[data-book]')[this.statusAvanzamento]){
            this.openNextBook();
        }else{
            await this.loadPosts(6, this.currentIndex);
            setTimeout(() => {
                this.openNextBook();
            }, 1000);
        }
    },

    openNextBook(){
        if(document.querySelectorAll('[data-book]')[this.statusAvanzamento]){
            document.querySelectorAll('[data-book]')[this.statusAvanzamento].classList.add("active");
            this.scrollPosition();
        }
    },

    scrollPosition(){
        document.getElementById(`capitolo-${this.statusAvanzamento}`).scrollIntoView({ behavior: 'smooth', block: 'start'  });
    },

    loadMore: {
      ["@click"]() {
        this.loadPosts(6, this.currentIndex);
      },
    },

  };
};
