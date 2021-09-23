const app = require('./app');
const { connect } = require('./database')

app.set('port', process.env.PORT || 3338);

async function main(){
    try{
        await connect();
        
        await app.listen(app.get('port'));
        console.log('Server on port :' + app.get('port'));

    } catch(e){
        console.log('Error: ' +e);
    }
    
}

main();