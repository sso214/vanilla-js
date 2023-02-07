class StopWatch {
    $timeBox;
    $buttonWrap;
    $recordList;

    time;
    timeout;

    //외부에서 사용하지 않는 메서드의 경우 private으로 만들기 (button dom)
    //버튼 3개로 관리 (start -> stop)
    //innerHTML 대신 insertAdjacentHTML 사용
    //getButton filter 대신 find 사용


    constructor({ timeBox, buttonWrap, recordList }) {
        this.$timeBox = timeBox;
        this.$buttonWrap = buttonWrap;
        this.$recordList = recordList;

        this.init();
    }

    get timeStr() {
        const timeFormat = this.time.map((v) => `${v}`.padStart(2, '0'));
        return timeFormat.join(':');
    }

    get startButton() {
        return this.getButton('start');
    }

    get stopButton() {
        return this.getButton('stop');
    }

    get resetButton() {
        return this.getButton('reset');
    }

    get recordButton() {
        return this.getButton('record');
    }

    getButton(type) {
        return [...this.$buttonWrap.childNodes]
            .filter((v) => v.dataset?.type === type)[0];
    }

    setTime(time) {
        this.time = [...time];
        this.render();
    }

    init() {
        this.setTime([0,0,0]);
        this.addEvent();
    }

    start() {
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

            this.setTime([mn, sc, ms]);
        }, 10);
    }

    stop() {
        clearTimeout(this.timeout);
    }

    reset() {
        this.stop();
        this.setTime([0,0,0]);
        this.$recordList.innerHTML = '';
    }

    record() {
        console.log(this.$recordList);
        this.$recordList.insertAdjacentHTML('afterbegin',`<li>${this.timeStr}</li>`);
    }

    render() {
        this.$timeBox.innerHTML = this.timeStr;
    }

    addEvent() {
        this.$buttonWrap.addEventListener('click', (e) => {
            const type = e.target.dataset.type;

            switch (type) {
                case 'start':
                    this.start();
                    this.startButton.style.display = 'none';
                    this.stopButton.style.display = 'block';
                    break;
                case 'stop':
                    this.stop();
                    this.startButton.style.display = 'block';
                    this.stopButton.style.display = 'none';
                    break;
                case 'reset':
                    this.reset();
                    this.startButton.style.display = 'block';
                    this.stopButton.style.display = 'none';
                    break;
                case 'record':
                    this.record();
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
