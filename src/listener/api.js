import {methods as m_log}   from 'src/app/logging';
import {variables as v_con} from 'src/app/connection';

const file = 'src\\listener\\api.js';

const listeners = {
  connected:    (api) => {
    m_log.message(`Listener: api -> connected`, 'info', file, 'connected', api);
    // v_con.value.api         = api['data']['cid'];
    v_con.value.isConnected = true;
    //v_indexPage.value.dialog = false;
    // methods.processEmitterQueue();
  },
  disconnected: (api) => {
    // 'api.send.disconnected',

    m_log.message(`Listener: api -> disconnected`, 'info', file, 'disconnected', api);
    v_con.value.api = api['data']['cid'];
  }
};

export {listeners};
