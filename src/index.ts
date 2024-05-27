import { loggerRegisterConsumer } from "./consumers/logger.consumer";

loggerRegisterConsumer().catch(console.error)