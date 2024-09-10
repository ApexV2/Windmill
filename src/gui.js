import DataStream from './dataStream.js';
import Producer from './producer.js';
import Processor from './processor.js';
import Consumer from './consumer.js';

const dataStream = new DataStream();
const producer = new Producer(dataStream);
const processor = new Processor(dataStream);
const consumer = new Consumer(dataStream);

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const output = document.getElementById('output');

let running = false;

function log(message) {
    const div = document.createElement('div');
    div.textContent = message;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

async function run() {
    while (running) {
        await producer.run();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

processor.process = (item) => {
    const processedItem = {
        value: item.value * 2,
        timestamp: item.timestamp
    };
    log(`Processed: ${JSON.stringify(processedItem)}`);
    return processedItem;
};

consumer.consume = (item) => {
    log(`Consumed: ${JSON.stringify(item)}`);
};

startBtn.addEventListener('click', () => {
    running = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    run();
    processor.run();
    consumer.run();
});

stopBtn.addEventListener('click', () => {
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});