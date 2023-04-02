<template>
  <q-btn label="add" dense outline rounded class="full-width" @click="m.new()"/>
  <q-table
    title="Gegenstände"
    grid-header
    :rows="v.objects"
    :columns="columns"
    row-key="name"
    selection="multiple"
    v-model:selected="v.selected"
    :filter="v.filter"
    grid
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="v.filter" placeholder="Suchen">
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
  <q-dialog v-model="v.dialog">
    <q-card>
      <q-card-section>Hallo</q-card-section>
      <q-separator/>
      <q-card-section>
        <q-input label="Name" dense v-model="v.character.name"/>
        <q-input label="Beschreibung" dense v-model="v.character.description"/>
        <q-checkbox label="Aktiv" dense v-model="v.character.active"/>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <q-btn-group flat>
          <q-btn label="Abbruch" @click="v.dialog = false"/>
          <q-btn label="Speichern" @click="m.save()"/>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import requests         from 'src/app/data/requests';
import tables           from 'src/app/types/tables';
import {useQuasar}      from 'quasar';

const $q = useQuasar();


const columns = [
  {
    name:     'characterName',
    required: true,
    label:    'Name',
    align:    'left',
    field:    row => row.name,
    sortable: true
  },
  {
    name:     'description',
    align:    'center',
    label:    'Beschreibung',
    field:    'description',
    sortable: true
  },
  {
    name:     'active',
    label:    'Aktiv',
    field:    'active',
    sortable: true
  }
];

const m = {
  load:    async() => {
    v.value.objects = await requests.getAll(tables.Objects);
  },
  new:     () => {
    $q.dialog({
                title:      'Neuer Gegenstand',
                message:    'Name des neuen Gegenstands',
                prompt:     {
                  model: '',
                  type:  'text' // optional
                },
                cancel:     true,
                persistent: true
              }).onOk(async data => {
      await requests.new(tables.Objects, {
        name:   data,
        active: true
      });
      await m.load();
    });
  },
  display: (id) => {
    v.value.selectedId = id;
    v.value.object     = v.value.objects[id];
    v.value.dialog     = true;
  },
  save:    () => {
    v.value.objects[v.value.selectedId] = v.value.object;
    v.value.dialog                      = false;
  },
  delete:  (id) => {
    $q.dialog({
                title:      'Charakter löschen',
                message:    `Möchtest Du wirklich den Charakter mit dem Namen ${v.value.objects[id].name} löschen?`,
                cancel:     true,
                persistent: true
              }).onOk(() => {
      requests.delete(tables.Objects, v.value.object[id].id);
      v.value.objects.splice(id, 1);
    });
  }
};

const v = ref({
                objects:    [],
                filter:     '',
                selected:   [],
                dialog:     false,
                selectedId: -1,
                object:     undefined
              });

onMounted(async() => {
  await m.load();
});
</script>
