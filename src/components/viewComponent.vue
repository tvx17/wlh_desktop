<template>
  <q-btn label="add" dense outline rounded class="full-width" @click="m.new()"/>
  <div>Hallo: {{props.ooptions}} - {{v_data_items}} - {{v_table_columns}}</div>
  <q-table v-if="v_table_columns.length > 0 && v_data_items.length > 0"
           :title="props.componentTitle"
           grid-header
           :rows="v_data_items"
           :columns="v_table_columns"
           row-key="name"
           selection="multiple"
           v-model:selected="v_table_selected_items"
           :filter="v_table_filter"
           grid
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="v_table_filter" placeholder="Suchen">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>

    <template v-slot:item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-card-section>
            <div class="row">
              <div class="col-10">
                <q-checkbox dense v-model="props.selected" :label="props.row.name"/>
              </div>
              <div class="col-2">
                <q-btn-group flat rounded>
                  <q-btn icon="las la-pen" dense flat @click="m.display(props.rowIndex)"/>
                  <q-btn icon="las la-trash" dense flat @click="m.delete(props.rowIndex)"/>
                </q-btn-group>
              </div>
            </div>

          </q-card-section>
          <q-separator/>
          <q-list dense>
            <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
              <q-item-section>
                <q-item-label>{{col.label}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label v-if="col.value !== true && col.value !== false" caption>{{col.value}}</q-item-label>
                <q-item-label v-if="col.value === true">
                  <q-icon name="las la-check" color="green"/>
                </q-item-label>
                <q-item-label v-if="col.value === false">
                  <q-icon name="las la-times" color="red"/>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>
  <component v-if="v_edit_component" :is="v_edit_component" :dialog-visible="v_dialog_visible" :id="v_chosen_id" @visible="m.changeVisibility"/>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useQuasar}             from 'quasar';
import connection              from 'src/app/connection';

import characterEdit from 'src/components/editComponents/characterEditComponent.vue';
import objectEdit    from 'src/components/editComponents/objectsEditComponent.vue';
import locationEdit  from 'src/components/editComponents/locationsEditComponent.vue';

const props = defineProps({options: {type: Object}});

watch(() => props.options, (newValues, oldValues) => {
  m.load();
});

const $q = useQuasar();

const m = {
  changeVisibility: async(isVisible) => {
    v_dialog_visible.value = isVisible;
    // v_data_items.value     = await requests.getAll(props.options.url);
  },
  load:             async() => {
    const data = await connection.requestGet('character/all');
    // const test            = await requests.getBy(tables.TableDescription, 'table', props.options.url);
    // v_table_columns.value = test['options'];
    // v_data_items.value    = await requests.getAll(props.options.url);
  },
  new:              () => {
    $q.dialog({
                title:      props.options.dialogNewItemTitle,
                message:    props.options.dialogNewItemText,
                prompt:     {
                  model: '',
                  type:  'text' // optional
                },
                cancel:     true,
                persistent: true
              }).onOk(async data => {
      // await requests.new(props.options.url, {
      //   name:   data,
      //   active: true
      // });
      await m.load();
    });
  },
  display:          (arrayIndex) => {
    v_chosen_id.value      = v_data_items.value[arrayIndex].id;
    v_dialog_visible.value = true;
    switch(props.options.datatableName){
      case 'characters':
        v_edit_component.value = characterEdit;
        break;
      case 'locations':
        v_edit_component.value = locationEdit;
        break;
      case 'objects':
        v_edit_component.value = objectEdit;
        break;
    }

  },
  save:             () => {
    v_data_items.value[v.value.selectedId] = v.value.character;
    v_dialog_visible.value                 = false;
  },
  delete:           (id) => {
    $q.dialog({
                title:      'Löschen',
                message:    `Möchtest Du wirklich das Folgende löschen: ${v_data_items.value[id].name}?`,
                cancel:     true,
                persistent: true
              }).onOk(() => {
      requests.delete(props.options.datatableName, v_data_items.value[id].id);
      v_data_items.value.splice(id, 1);
    });
  }
};

// ------------------------- Variables
const v_table_columns        = ref([]);
const v_data_items           = ref([]);
const v_table_filter         = ref('');
const v_table_selected_items = ref([]);
const v_dialog_visible       = ref(false);
const v_edit_component       = ref(undefined);
const v_chosen_id            = ref(0);


onMounted(async() => {
  await m.load();
});

</script>
