import Sendsay from 'sendsay-api/dist/sendsay-api.cjs';
import { sendsayConfig } from '../config/index'
import filesToBase64 from './toBase64'

export default function sendMessageSendsay(message) {
  return new Promise((resolve) => {
    var sendsay = new Sendsay();
    sendsay.login({
      login: sendsayConfig.login, 
      password: sendsayConfig.password,  
    })
    .then(() => filesToBase64(message.files)
    .then((filesToUpload) => {
      var fullMessage = {
        "action" : "issue.send.test",
        "letter" : {
          "subject" : message.subject,
          "from.name" : message.fromName, 
          "from.email" : message.fromEmail,
          "to.name" : message.toName,
          "message": { "text" : message.messageText },
          "attaches": filesToUpload ,
        },
        "sendwhen": "test",
        "mca": [
          message.toEmail,
        ]
      };
      var req = sendsay.request(fullMessage);
      req.then(function(res) {
        resolve(res);
      });

    }
    )
    )
}) 
}
