import Sendsay from 'sendsay-api'
import { sendsayConfig } from '../../config/index'

export default function getMessages() {
    var sendsay = new Sendsay();

    sendsay.login({
      login: sendsayConfig.login, 
      password: sendsayConfig.password,  
    }).then(function() {
      // The sendsay instance is authenticated. Do a request.
    })
    
}
