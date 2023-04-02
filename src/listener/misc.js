import {Notify}           from 'quasar';
import {methods as m_log} from 'src/app/logging';

const file = 'listener\\misc.js';

export const listeners = {
  connect:    (api) => {
    m_log.message(`Listeners: misc -> connect`, 'info', file, 'connect', api);
    variables.value.isConnected = true;
  },
  disconnect: (api) => {
    // 'disconnect',
    m_log.message(`Listeners: misc -> disconnect`, 'info', file, 'disconnect', api);
    methods.changeConnection('close');
  },
  error:      (api) => {
    m_log.message(`Listeners: misc -> error`, 'info', file, 'error', api);
    let error_message = '<v_table>';
    error_message += `<tr><td class="text-weight-bolder">Typ</td><td class="text-italic">${api['data']['type']}</td>`;
    error_message += `<tr><td class="text-weight-bolder">Hinweis</td><td class="text-italic">${api['data']['message']}</td>`;
    error_message += `<tr><td class="text-weight-bolder">Datei</td><td class="text-italic">${api['data']['file']}</td>`;
    error_message += `<tr><td class="text-weight-bolder">Zeile</td><td class="text-italic">${api['data']['line']}</td>`;

    Notify.create({
                    message:   'Fehler in der API',
                    type:      'negative',
                    html:      true,
                    multiLine: true,
                    position:  'top',
                    caption:   error_message,
                    actions:   [{
                      icon:  'close',
                      color: 'white'
                    }],
                    timeout:   0
                  });
  },
  log:        (api) => {
    m_log.message(`Listeners: misc -> log`, 'info', file, 'log', api);
    Notify.create({
                    message:   `API-Log (${api['data']['level']})`,
                    type:      'primary',
                    html:      true,
                    multiLine: false,
                    position:  'bottom-left',
                    caption:   api['data']['message'],
                    actions:   [{
                      icon:  'close',
                      color: 'white'
                    }],
                    timeout:   10000
                  });
  },
  message:    (api) => {
    m_log.message(`Listeners: misc -> message`, 'info', file, 'message', api);
    Notify.registerType('my-notif', {
      icon:      'announcement',
      color:     'brown',
      textColor: 'white'
    });
    Notify.create({
                    message:   'API-Meldung',
                    type:      'my-notify',
                    html:      true,
                    multiLine: true,
                    position:  'bottom',
                    caption:   api['data']['message'],
                    actions:   [{
                      icon:  'close',
                      color: 'white'
                    }],
                    timeout:   0
                  });
  }
};

