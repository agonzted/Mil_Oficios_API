const Role = require('../models/role');

exports.createRoles = async (req, res) => {
   try {
    const count = await Role.estimatedDocumentCount();

    if(count > 0) return;

    const values = await Promise.all([
        new Role({name:'Administrator'}).save(),
        new Role({name:'Consumer'}).save(),
        new Role({name:'Worker'}).save()
    ])
    console.log(values);
   } catch (error) {
       console.log(error);
   }
   
};