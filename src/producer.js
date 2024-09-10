class Producer {
  constructor(dataStream) {
    this.dataStream = dataStream;
  }

  async run() {
    while (true) {
      const item = {
        value: Math.random(),
        timestamp: Date.now()
      };
      this.dataStream.push(item);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export default Producer;