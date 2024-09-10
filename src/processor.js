class Processor {
  constructor(dataStream) {
    this.dataStream = dataStream;
  }

  async run() {
    for await (const item of this.dataStream) {
      const processedItem = this.process(item);
      console.log('Processed:', processedItem);
    }
  }

  process(item) {
    return {
      value: item.value * 2,
      timestamp: item.timestamp
    };
  }
}

export default Processor;