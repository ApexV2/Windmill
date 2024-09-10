import { EventEmitter } from 'events';

class DataStream extends EventEmitter {
  constructor() {
    super();
    this.data = [];
  }

  push(item) {
    this.data.push(item);
    this.emit('newData', item);
  }

  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: async () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          await new Promise(resolve => this.once('newData', resolve));
          return { value: this.data[index++], done: false };
        }
      }
    };
  }
}

export default DataStream;