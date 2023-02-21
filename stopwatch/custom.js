class StopWatch {
    $timeBox;
    $buttonWrap;
    $recordList;

    time;
    timeout;

    constructor() {
        this.#init();
    }

    get #timeStr() {
        const timeFormat = this.time.map((v) => `${v}`.padStart(2, '0'));
        return timeFormat.join(':');
    }

    #getButton(type) {
        return [...this.$buttonWrap.childNodes].find((v) => v.dataset?.type === type);
    }

    #getButtonName(type) {
        return `${type[0].toUpperCase()}${type.substring(1,)}`;
    }

    #changeButton(before, after) {
        const target = this.#getButton(before);
        if (target) {
            target.dataset.type = after;
            target.innerText = this.#getButtonName(after);
        }
    }

    #setTime(time) {
        this.time = [...time];
        this.#render();
    }

    #initRender() {
        const section = document.createElement('section');
        const container = document.createElement('div');
        this.$timeBox = document.createElement('p' )
        this.$buttonWrap = document.createElement('div');
        this.$recordList = document.createElement('ol');

        section.style.cssText = 'max-width:500px;margin:100px auto;padding:20px;display:flex;align-items:center;border:1px solid #999;border-radius:5px;text-align:center';
        container.style.cssText = 'flex:1';

        this.$timeBox.style.cssText = 'margin-bottom:50px;font-size:30px;font-weight:bold';
        this.$buttonWrap.style.cssText = 'display:flex;align-items:center;justify-content:space-between';
        this.$recordList.style.cssText = 'margin-left:20px;flex:none;min-width:100px;height:300px;padding:10px;overflow:auto;border:1px solid #999;border-radius:5px;list-style:none';

        ['start', 'reset', 'record'].forEach((key) => {
            const button = document.createElement('button');
            button.dataset.type = key;
            button.style.cssText = 'height:45px;margin:3px 1%;display:inline-flex;align-items:center;justify-content:center;flex:1;color:#fff;background:#000;border:0;border-radius:3px;cursor:pointer';
            button.innerText = this.#getButtonName(key);
            this.$buttonWrap.appendChild(button);
        });

        this.$timeBox.innerText = '00:00:00';

        container.appendChild(this.$timeBox);
        container.appendChild(this.$buttonWrap);
        section.appendChild(container);
        section.appendChild(this.$recordList);
        document.getElementById('app').appendChild(section);
    }

    #init() {
        this.#initRender();
        this.#setTime([0,0,0]);
        this.#addEvent();
    }

    #start() {
        let [mn, sc, ms] = this.time;

        this.timeout = setInterval(() => {
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
        clearTimeout(this.timeout);
    }

    #reset() {
        this.#stop();
        this.#setTime([0,0,0]);
        this.$recordList.innerHTML = '';
    }

    #record() {
        this.$recordList.insertAdjacentHTML('afterbegin',`<li>${this.#timeStr}</li>`);
    }

    #render() {
        this.$timeBox.innerHTML = this.#timeStr;
    }

    #addEvent() {
        this.$buttonWrap.addEventListener('click', (e) => {
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

new StopWatch();
