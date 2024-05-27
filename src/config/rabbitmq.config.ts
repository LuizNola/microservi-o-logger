import amqplib from 'amqplib';
require('dotenv').config();


const RABBITMQ_URL = process.env.RABBITMQ_URL || "";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log('Conectado ao RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Erro na conexão com o RabbitMQ:', error);
    throw error;
  }
};

export const sendMessage = async (queue: string, message: string) => {
    try {
      const channel = await connectRabbitMQ();
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      console.log(`Mensagem enviada para a fila ${queue}: ${message}`);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o RabbitMQ:', error);
    }
  };
