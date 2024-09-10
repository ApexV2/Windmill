import DataStream from './dataStream.js';
import Producer from './producer.js';
import Processor from './processor.js';
import Consumer from './consumer.js';

async function main() {
  const dataStream = new DataStream();
  const producer = new Producer(dataStream);
  const processor = new Processor(dataStream);
  const consumer = new Consumer(dataStream);

  await Promise.all([
    producer.run(),
    processor.run(),
    consumer.run()
  ]);
}

main().catch(console.error);