class StopWatch {
    $timeBox;
    $buttonWrap;
    $recordList;

    time;
    timeout;

    constructor({ timeBox, buttonWrap, recordList }) {
        this.$timeBox = timeBox;
        this.$buttonWrap = buttonWrap;
        this.$recordList = recordList;

        this.init();
    }

    get timeStr() {
        const time = this.time.map((v) => `${v}`.padStart(2, '0'));
        return time.join(':');
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
        this.setTime([0,0,0]);
    }

    record() {
        this.$recordList.innerHTML = `<li></li>`
        console.log('record');
    }

    render() {
        // const time = this.time.map((v) => `${v}`.padStart(2, '0'));
        this.$timeBox.innerHTML = this.timeStr;
    }

    addEvent() {
        this.$buttonWrap.addEventListener('click', (e) => {
            const type = e.target.dataset.type;

            switch (type) {
                case 'start':
                    this.start();
                    break;
                case 'stop':
                    this.stop();
                    break;
                case 'reset':
                    this.reset();
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
