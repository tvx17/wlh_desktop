import db     from 'src/app/database/db.js_';
import tables from 'src/app/types/tables';
import executionTypes from 'src/app/types/executionTypes';


export const methods = {
  _bulk:       false,
  _data:       [],
  bulkModeOn:  () => {
    methods.bulk  = true;
    methods._data = [];
  },
  bulkModeOff: () => {
    methods.bulk  = false;
    methods._data = [];
  },
  bulkMode:    (status = true) => {
    methods.bulk  = status;
    methods._data = [L];
  },
  get:         async(what, id, fields = null, orderBy = 'name') => {
    return db[what].where('id').equals(id).orderBy(orderBy).toArray();
  },
  getBy:       async(what, whereField, whereValue, fields = null, orderBy = 'name') => {
    const data = await db[what].where(whereField).equals(whereValue).toArray();
    if(data.length === 1){
      return data[0];
    }
    return data;
  },
  getAll:      async(what, fields = null, orderBy = 'name') => {
    return db[what].orderBy(orderBy).toArray();
  },
  getInScene:  async(mappingType, textId, table) => {
    let promise = new Promise(async(resolve, reject) => {
      const returnItems  = [];
      const mappingItems = await db[tables.mappings].where({
                                                             type:     mappingType,
                                                             right_id: textId
                                                           }).toArray();
      for(let item of mappingItems){
        const foundItem = await db[table].where('id').equals(item.right_id).toArray();
        returnItems.push(foundItem[0]);
      }
      resolve(returnItems);
    });

    return await promise;
  },

  new:        async(what, data = undefined) => {
    if(data === undefined){
      data = methods._data;
    }
    if(Array.isArray(data)){
      await db[what].bulkAdd(data);
    } else{
      return await db[what].add(data);
    }
  },
  update:     async(what, id, data) => {
    await db[what].update(id, data);
  },
  delete:     async(what, id) => {
    await db[what].delete(id);
  },
  deactivate: async(what, id) => {
    await db[what].update(id, {active: false});
  },
  addData:    (data) => {
    methods._data.push(data);
  },
  execute:    async(what, table) => {
    switch(what){
      case executionTypes.new:
        await methods.new(table, methods._data);
    }
    methods.bulkModeOff();
  }
};


export default methods;
