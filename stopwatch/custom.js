class StopWatch {
    #$timeBox;
    #$buttonWrap;
    #$recordList;

    #time;
    #timeout;

    //엘리먼트 생성도 class 내부에서

    constructor({ timeBox, buttonWrap, recordList }) {
        this.#$timeBox = timeBox;
        this.#$buttonWrap = buttonWrap;
        this.#$recordList = recordList;

        this.#init();
    }

    get #timeStr() {
        const timeFormat = this.#time.map((v) => `${v}`.padStart(2, '0'));
        return timeFormat.join(':');
    }

    #getButton(type) {
        return [...this.#$buttonWrap.childNodes].find((v) => v.dataset?.type === type);
    }

    #changeButton(before, after) {
        const target = this.#getButton(before);
        if (target) {
            target.dataset.type = after;
            target.innerText = `${after[0].toUpperCase()}${after.substring(1,)}`;
        }
    }

    #setTime(time) {
        this.#time = [...time];
        this.#render();
    }

    #init() {
        this.#setTime([0,0,0]);
        this.#addEvent();
    }

    #start() {
        let [mn, sc, ms] = this.#time;

        this.#timeout = setInterval(() => {
            if (ms === 99) {
                ms = -1;
                sc++;
            }

            if (sc === 60) {
                sc = 0;
                mn++;
            }

            ms++;

            this.#setTime([mn, sc, ms]);
        }, 10);
    }

    #stop() {
        clearTimeout(this.#timeout);
    }

    #reset() {
        this.#stop();
        this.#setTime([0,0,0]);
        this.#$recordList.innerHTML = '';
    }

    #record() {
        this.#$recordList.insertAdjacentHTML('afterbegin',`<li>${this.#timeStr}</li>`);
    }

    #render() {
        this.#$timeBox.innerHTML = this.#timeStr;
    }

    #addEvent() {
        this.#$buttonWrap.addEventListener('click', (e) => {
            const type = e.target.dataset.type;

            switch (type) {
                case 'start':
                    this.#start();
                    this.#changeButton('start', 'stop');
                    break;
                case 'stop':
                    this.#stop();
                    this.#changeButton('stop', 'start');
                    break;
                case 'reset':
                    this.#reset();
                    this.#changeButton('stop', 'start');
                    break;
                case 'record':
                    this.#record();
                    break;
                default:
                    return false;
            }
        })
    }
}

new StopWatch({
    timeBox: document.getElementById('timeBox'),
    buttonWrap: document.getElementById('buttonWrap'),
    recordList: document.getElementById('recordList'),
});
