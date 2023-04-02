// Methods
import logging   from 'src/app/logging';
import {api}     from 'boot/axios';
import {Loading} from 'quasar';

let connectionListener = null;

const file = 'app\\connection.js';


export const methods = {
  emit:     async(module, section, data, method = 'post') => {
    logging.message(`Emitting -> Module: ${module}, section: ${section}, method: ${method}`, 'info', file, 'emit', data);
    const response = await api[method](`${module}/${section}`, data).catch((error) => {
      console.error(error);
    });
    if(response !== undefined){
      return response.data;
    }
  },
  checkApi: () => {
    api['get']('is_alive').then(
      (response) => {
        clearInterval(connectionListener);
        Loading.hide();
      }).catch((error) => {
      connectionListener = setInterval(methods.checkApi, 10000);
      Loading.show({
                     message: 'Starte das Programm'
                   });
    });
  }
};


export default methods;
