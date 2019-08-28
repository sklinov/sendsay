import Sendsay from 'sendsay-api/dist/sendsay-api.cjs';
import { sendsayConfig } from '../config/index'
import toBase64 from './toBase64'

export default function sendMessage(message) {
  return new Promise((resolve) => {
    var sendsay = new Sendsay();
    var filesToUpload = [];
    sendsay.login({
      login: sendsayConfig.login, 
      password: sendsayConfig.password,  
    })
    .then(function() {
      filesToUpload = message.files.map(file => {
        var fileContent = toBase64(file);
         
        var fileToUpload = {
                              name: file.name,
                              content: fileContent,
                              encoding: 'base64'
                            };
        console.log(fileToUpload);
        return fileToUpload; 
      })
    })
    .then(function() {
      var req = sendsay.request(
        {
            "action" : "issue.send.test",
            "letter" : {
              "subject" : message.subject,
              "from.name" : message.fromName, 
              "from.email" : message.fromEmail,
              "to.name" : message.toName,
              "message": {"text" : message.messageText },
              "attaches": filesToUpload,
            },
            "sendwhen": "test",
            "mca": [
              message.toEmail,
            ]
          }          
      );
      req.then(function(res) {
        resolve(res);
      });

  })
}) 
}
