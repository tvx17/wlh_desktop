import {Notify, LocalStorage, Dialog} from 'quasar';
import settings                       from 'src/variables/settings';


export const methods = {
  isSetup:          () => {
    settings.value.setup = LocalStorage.getItem('wlhSetup');
  },
  setupDone:        () => {
    LocalStorage.set('wlhSetup', true);
    methods.isSetup();
  },
  promptDialog:     async(title, message) => {
    let promise = new Promise((resolve, reject) => {
      Dialog.create({
                      title:      title,
                      message:    message,
                      cancel:     true,
                      persistent: true
                    }).onOk(() => {
        resolve(true);
      }).onCancel(() => {
        resolve(false);
      });
    });
    return await promise;
  },
  displayNotify:    (headline, message, type = NotifyTypes.information, position = NotifyPosition.topRight) => {
    let icon    = 'las la-info';
    let color   = 'primary';
    let timeout = 5000;
    switch(type){
      case NotifyTypes.warning:
        icon  = 'las la-question';
        color = 'warning';
        break;
      case NotifyTypes.error:
        icon    = 'las la-exclamation-triangle';
        color   = 'negative';
        timeout = 0;
        break;
    }

    Notify.registerType('my-notif', {
      icon:      icon,
      color:     color,
      textColor: 'white'
    });
    Notify.create({
                    message:   headline,
                    type:      'my-notify',
                    html:      true,
                    multiLine: true,
                    position:  position,
                    caption:   message,
                    actions:   [{
                      icon:  'close',
                      color: 'white'
                    }],
                    timeout:   timeout
                  });
  },
  isVersionGreater: (version, compareVersion) => {
    if(version.major > compareVersion.major){
      return true;
    }
    if(version.major === compareVersion.major){
      if(version.minor > compareVersion.minor){
        return true;
      } else{
        if(version.path > compareVersion.patch){
          return true;
        } else{
          if(version.alpha !== 0){
            if(version.alpha > compareVersion.alpha){
              return true;
            }
          }
          if(version.beta !== 0){
            if(version.beta > compareVersion.beta){
              return true;
            }
          }
          if(version.release !== 0){
            if(version.release > compareVersion.release){
              return true;
            }
          }
        }
      }
    }
  }
};


export default methods;
