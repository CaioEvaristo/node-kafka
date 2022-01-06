import express from 'express';
import { Kafka } from 'kafkajs';
import routes from './routes';

const app = express();
//use bodyparse 
app.use(express.json());

// Criar conexão com o kafka
const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300,
        retries: 10,
    },
});
const producer = kafka.producer(); 

// Criando middleware para usar o producer em qualquer rota
app.use((req, res, next) => {
    req.producer = producer;

    return next();
})
// Registra as rotas
app.use(routes)


async function run() {
    await producer.connect();
    app.listen(3333)
}

run().catch(console.error);