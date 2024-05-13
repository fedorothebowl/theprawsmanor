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
            // console.log('L\'audio è finito n.' + e.detail.index);
            this.statusAvanzamento = e.detail.index + 1;
            setTimeout(() => {
                this.closeBook();
            }, 250);
            setTimeout(() => {
                this.openNext();
            }, 800);
        });

    },    

    async loadPosts(num, indexStart) {

      this.loader = true;

      fetch(this.url)

        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore nella richiesta!");
          }
          return response.json();
        })

        .then((data) => {

          for (let index = indexStart; index < indexStart + num; index++) {
            if(data[index]){
                this.books.push(data[index]);
            } else{
                this.hideBtn = true;
            }
          }

          this.numOfPosts = data.length -1;

            setTimeout(() => {
                this.loader = false;
            }, 500);

        });

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
            document.querySelectorAll('[data-book]')[this.statusAvanzamento].classList.add("active");
            this.scrollPosition();
        }else{
            await this.loadPosts(6, this.currentIndex);
            if(document.querySelectorAll('[data-book]')[this.statusAvanzamento]){
                document.querySelectorAll('[data-book]')[this.statusAvanzamento].classList.add("active");
                this.scrollPosition();
            }
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
