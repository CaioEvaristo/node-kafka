import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'certificate',
    brokers: ['localhost:9092'],
});

const topic = 'issue-certifications';
const consumer = kafka.consumer({ groupId: 'certification-api' });

async function run() {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            const data = message.value.toString();
            console.log(`${data}`);
        }
    });
}

run().catch(console.error);
