import Sendsay from 'sendsay-api'
import { sendsayConfig } from '../../config/index'

export default function sendMessage(message) {
    var sendsay = new Sendsay();

    sendsay.login({
      login: sendsayConfig.login, 
      password: sendsayConfig.password,  
    }).then(function() {
      var req = sendsay.request(
        {
            "action" : "issue.send.test",
            "letter" : {
              "subject" : message.subject,
              "from.name" : message.fromName, 
              "from.email" : message.fromEmail,
              "to.name" : message.toName,
              "message": {"text" : message.messageText },
            //   "attaches": [ 
            //                 message.files.map(file => {
            //                     return {
            //                         name: file.name,
            //                         content: file.content,
            //                         encoding: 'base64'
            //                     }
            //                 })
            //               ]
            },
            "sendwhen": "test",
            "mca": [
              message.toEmail,
            ]
          }          
      );
      req.then(function(res) {
        var settings = res.list;
        console.log(settings);
      });
    })
    
}
