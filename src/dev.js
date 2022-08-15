
const { ServiceBroker } = require("moleculer");

let r = Math.random().toString(36).substring(7);

// Create a ServiceBroker
const broker = new ServiceBroker({
    namespace: 'hellome',
    nodeID: "hello-local-"+r,
    hotReload: true,
    

});


broker.loadServices("module","*/services/**/*.service.js");
broker.start().then(() => {
    // Switch to REPL mode
    broker.repl();
}).catch(e => console.log(e.message));
