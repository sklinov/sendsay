import Sendsay from 'sendsay-api/dist/sendsay-api.cjs';
import { sendsayConfig } from '../config/index'

export default function getStatusSendsay(message) {
    return new Promise((resolve) => {
      var sendsay = new Sendsay();
      sendsay.login({
        login: sendsayConfig.login, 
        password: sendsayConfig.password,  
      }).then(function(login_res) {
        var req = sendsay.request(
          {
            "action" : "track.get",
            "id": message.trackId
          }          
        );
        req.then(function(res) {
          console.log(res);
          resolve(res);
        });
  
    })
  }) 
}


