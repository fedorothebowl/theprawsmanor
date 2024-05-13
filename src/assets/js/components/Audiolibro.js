export default () => {
  return {

    url: "/json/audiolibro.json",
    books: [],
    loader: true,
    numOfPosts: undefined,
    currentIndex: 0,
    hideBtn: false,
    statusAvanzamento:0,
    showMessage : false,

    async init() {
        
        await this.openNext();

        document.addEventListener('endAudio', (e) => {
            // console.log('L\'audio è finito n.' + e.detail.index);
            this.statusAvanzamento = e.detail.index + 1;
            setTimeout(() => {
                this.closeBook();
            }, 500);
            setTimeout(() => {
                this.openNext();
            }, 1000);
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
    },

    closeBook(){
        document.querySelectorAll('[data-book]').forEach(el=>{
            el.classList.remove('active');
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
        }else{
            await this.loadPosts(6, this.currentIndex);
            setTimeout(() => {
                if(document.querySelectorAll('[data-book]')[this.statusAvanzamento]){
                    document.querySelectorAll('[data-book]')[this.statusAvanzamento].classList.add("active");
                }else{
                    this.showMessage = true;
                }
            }, 300);
        }
    },

    loadMore: {
      ["@click"]() {
        this.loadPosts(6, this.currentIndex);
      },
    },

  };
};
