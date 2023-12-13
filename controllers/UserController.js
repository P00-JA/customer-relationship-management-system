const { where } = require('sequelize');
const Users= require('../models/Users');
const bcrypt = require('bcrypt');
const JWTManager = require('../middlewares/JWTManager');
const JWTAdmin = require('../middlewares/JWTAdmin');
const Manager = require('../models/Manager');
const Roles = require('../models/Roles');
const JWTSalesRepresentative = require('../middlewares/JWTSalesRepresentative');
const SalesRepresentative = require('../models/SalesRepresentative');
const JWTCustomer = require('../middlewares/JWTCustomer');
const Customers = require('../models/Customers');

const UserController = {
    async ManagerLogin (req,res){
        try {
            let manager = await Users.findOne({ where: { email: req.body.email } });
            if (!manager) {
              return res.status(409).json({ errors: { message: "Please register" } });
            }
            
            if(bcrypt.compareSync(req.body.password,manager.password)){
              const token = JWTManager.createToken({email:manager.email},true);
              res.cookie("refresh_token",token.refresh_token,{
                expires : new Date(Date.now()+(24*60*60)),
                httpOnly: true,
              });

              Users.findByPk(manager.id,{include:Manager}).then(user =>{
                res.json({'managerData' : {
                    id:user.Manager.id,
                    name: user.Manager.name,
                    phone: user.Manager.phone,
                    branch:user.Manager.branch,
                    access_token : token.access_token
                  }});
              });
            }else{
                res.status(404).json({errors:{message:'incorrect Password'}})
            }
          } catch (error) {
            console.error('Error in logging in:', error);
            res.status(500).json({ message: "login error ,please try again after some times!" });
          }
    },

    async adminLogin(req,res){
        try {
            let admin = await Users.findOne({ where: { email: req.body.email } });
            if (!admin) {
              return res.status(409).json({ errors: { message: "Please register" } });
            }
            
            if(bcrypt.compareSync(req.body.password,admin.password)){
              const token = JWTAdmin.createToken({email:admin.email},true);
              res.cookie("refresh_token",token.refresh_token,{
                expires : new Date(Date.now()+(24*60*60)),
                httpOnly: true,
              });

                res.json({'AdminAccess' : {
                    message:"Admin can do operations with the use of access token",
                    access_token : token.access_token
                  }});
            }else{
                res.status(404).json({errors:{message:'incorrect Password'}})
            }
          } catch (error) {
            console.error('Error in logging in:', error);
            res.status(500).json({ message: "login error ,please try again after some times!" });
          }
    },

    async salesRepresentativeLogin(req,res){
        try {
            let salesRep = await Users.findOne({ where: { email: req.body.email } });
            if (!salesRep) {
              return res.status(409).json({ errors: { message: "Please register" } });
            }
            
            if(bcrypt.compareSync(req.body.password,salesRep.password)){
              const token = JWTSalesRepresentative.createToken({email:salesRep.email},true);
              res.cookie("refresh_token",token.refresh_token,{
                expires : new Date(Date.now()+(24*60*60)),
                httpOnly: true,
              });

              Users.findByPk(salesRep.id,{include:SalesRepresentative}).then(user =>{
                res.json({'SalesRepresentative Data' : {
                    id:user.SalesRepresentative.id,
                    name: user.SalesRepresentative.name,
                    phone: user.SalesRepresentative.phone,
                    branch:user.SalesRepresentative.branch,
                    access_token : token.access_token
                  }});
              });
            }else{
                res.status(404).json({errors:{message:'incorrect Password'}})
            }
          } catch (error) {
            console.error('Error in logging in:', error);
            res.status(500).json({ message: "login error ,please try again after some times!" });
          }
    },
 
    async customerLogin(req,res){
      try {
          let customer = await Users.findOne({ where: { email: req.body.email } });
          if (!customer) {
            return res.status(409).json({ errors: { message: "Please register" } });
          }
          
          if(bcrypt.compareSync(req.body.password,salesRep.password)){
            const token = JWTCustomer.createToken({email:customer.email},true);
            res.cookie("refresh_token",token.refresh_token,{
              expires : new Date(Date.now()+(24*60*60)),
              httpOnly: true,
            });

            Users.findByPk(customer.id,{include:Customers}).then(user =>{
              res.json({'Customer Data' : {
                  id:user.Customers.id,
                  name: user.Customers.name,
                  phone: user.Customers.phone,
                  branch:user.Customers.branch,
                  access_token : token.access_token
                }});
            });
          }else{
              res.status(404).json({errors:{message:'incorrect Password'}})
          }
        } catch (error) {
          console.error('Error in logging in:', error);
          res.status(500).json({ message: "login error ,please try again after some times!" });
        }
  },
    
}

module.exports = UserController;