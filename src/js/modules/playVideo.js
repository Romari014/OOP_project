export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {//проверка на существующий iframe
                    this.overlay.style.display = 'flex'; //если есть, открываем его, без проверки будет создан новый
                } else {                                // и будет звук на фоне если закрыть видео
                    const  path = btn.getAttribute('data-url'); // если нету iframe, мы его создаем тут
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
           
            this.overlay.style.display = 'none';
            this.player.stopVideo(); //stopVideo функция из АРІ youtube
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
          });

          console.log(this.player);
          this.overlay.style.display = 'flex';
    }
 
    init() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}