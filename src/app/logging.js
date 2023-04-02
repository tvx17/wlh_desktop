import settings from 'src/variables/settings';


const methods = {

  message: (message, severity, file, method, data = null) => {
    if(settings.value.debug){
      let now = new Date();
      if(severity === null){
        severity = 'info';
      }
      const outputString = `[${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}]:[${severity}] -- ${message} (${file}: ${method})`;

      // emit
      // mSockets.emit('logger', 'message', {message: message, severity: severity, where: where, method: method})

      switch(severity){
        case 'info':
          if(data != null){
            console.log(outputString, data);
          } else{
            console.log(outputString);
          }

          break;
        case 'error':
          if(data != null){
            console.error(outputString, data);
          } else{
            console.error(outputString);
          }
          break;
        case 'warn':
          if(data != null){
            console.warn(outputString, data);
          } else{
            console.warn(outputString);
          }
          break;
      }
    }
  }
};

export default methods;
