class Calculator {
    $keypad;
    $result;
    prevValue = 0;

    constructor({ keypad, result }) {
        this.$keypad = keypad;
        this.$result = result;

        this.init();
    }

    get getResult() {
        return +this.$result.innerText;
    }

    get getPrevValue() {
        return +this.prevValue;
    }

    init() {
        this.render(0);
        this.addEvent();
    }

    render(num) {
        this.$result.innerText = num;
    }

    addEvent() {
        this.$keypad.addEventListener('click', (e) => {
            const value = e.target.dataset.value;
            let sum = this.getResult || '';

            if (!value) return;
            if (value.match(/^\d$/)) {
                sum += value;
            }
            switch (value) {
                case 'AC':
                    sum = 0;
                    break;
                case '+/-':
                    sum *= -1;
                    break;
                case '%':
                    break;
                case '/':
                    break;
                case 'X':
                    break;
                case '+':
                    sum = sum + this.getPrevValue;
                    break;
                case '.':
                    if (sum.toString().indexOf('.') === -1) {
                        sum = sum + '.';
                    }
                    break;
                case '=':
                    break;
                default:
                    break;
            }

            this.render(sum);
        });
    }
}

const calculator = new Calculator({
    keypad: document.getElementById('keypad'),
    result: document.getElementById('result'),
});


