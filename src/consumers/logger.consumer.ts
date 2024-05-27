import {connectRabbitMQ} from '../config/rabbitmq.config';
import { createLog } from '../service/logger.service';
import { validateMessage } from '../validators/logger.validate';

export const loggerRegisterConsumer = async () => {

  const queue = process.env.LOGGER_QUEUE || "loggerConsume";
  const channel = await connectRabbitMQ();
  await channel.assertQueue(queue, { durable: true });
  try {
    console.log(`Aguardando mensagens na fila ${queue}`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log(`Mensagem recebida: ${messageContent}`);

        if(validateMessage(messageContent as any)){
          channel.ack(msg);
          await createLog(messageContent as any)
        console.log("Concluido Com sucesso!!")

        }else{
          channel.nack(msg, false, false)
          console.log("Mensagem invalida!!")
        }
      }
    });
  } catch (error) {
    channel.consume(queue, async (msg) => {
      if (msg !== null) channel.nack(msg, false, false);
      console.error('Erro ao consumir mensagens do RabbitMQ');

    })
  }
};
