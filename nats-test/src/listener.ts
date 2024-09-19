import nats, {Message} from "node-nats-streaming";
import { randomBytes } from "node:crypto";

//? Clear the console before running the script
console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  }); //? This is to handle the close event

  const options = stan.subscriptionOptions()
    .setManualAckMode(true) //? This is to make sure that the message is not automatically acknowledged(we will do it manually)
    .setDeliverAllAvailable() //? This is to make sure that the listener gets all the events that were missed while the listener was down
    .setDurableName("order-service"); //? This is to make sure that the listener gets all the events that were missed while the listener was down
    
  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    options
  );
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack(); //? This is to acknowledge
  });
});


process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());