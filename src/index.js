const app = require('./app');
const { connect } = require('./database')

app.appSock.set('port', process.env.PORT || 5000);

async function main() {
    try {
      await connect();
  
      await app.serverSock.listen(app.appSock.get('port'), "0.0.0.0", () => {
        console.log('Server on port :' + app.appSock.get('port'));
      });
  
    } catch (e) {
      console.log('Error: ' + e);
    }
  
  }
  
  main();


