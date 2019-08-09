import Sendsay from 'sendsay-api'
//import Sendsay from 'sendsay-api/dist/sendsay-api.cjs';

import { sendsayConfig } from '../../config/index'
const Sendsay = require('sendsay-api');

//const Sendsay = require('sendsay-api');

export default function getMessages() {
    var sendsay = new Sendsay();

    sendsay.login({
      login: sendsayConfig.login, 
      password: sendsayConfig.password,  
    }).then(function() {
      // The sendsay instance is authenticated. Do a request.
    })
    
}
