class Consumer {
  constructor(dataStream) {
    this.dataStream = dataStream;
  }

  async run() {
    for await (const item of this.dataStream) {
      console.log('Consumed:', item);
    }
  }
}

export default Consumer;