export default ((index)=>{
    return{
        showAudio : false,

        init(){

            var detail = { 'index' : index };
            var evento = new CustomEvent('endAudio', { 'detail' : detail });

            setTimeout(() => {
                this.$refs.audioplayer.addEventListener('ended', function() {
                    document.dispatchEvent(evento);
                });
            }, 1000);

        },

        button:{
            ['@click'](){
                this.showAudio = true;
                this.$refs.audioplayer.addEventListener('canplaythrough', function() {
                    this.$refs.audioplayer.play();
                }, false);              
            }
        }
    }
})