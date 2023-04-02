<template>
  <q-dialog v-model="v_dialog_visible" persistent>
    <q-card>
      <q-card-section>Ort: {{v_data.name}}</q-card-section>
      <q-separator/>
      <q-card-section>
        <q-input label="Name" dense v-model="v_data.name"/>
        <q-input label="Beschreibung" dense v-model="v_data.description"/>
        <q-checkbox label="Aktiv" dense v-model="v_data.active"/>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <q-btn-group flat>
          <q-btn label="Abbruch" @click="emits('visible', false)"/>
          <q-btn label="Speichern" @click="m.save()"/>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';

const props = defineProps(['dialogVisible', 'id']);
const emits = defineEmits(['saved', 'visible']);

// ------------------------- Variables
const v_data           = ref({});
const v_dialog_visible = ref(false);

watch(() => props.dialogVisible, (newValue, oldValue) => {
  v_dialog_visible.value = newValue;
});

const m = {
  load: async() => {
    // v_data.value = await requests.getBy(tables.Locations, 'id', props.id);
  },
  save: async() => {
    // await requests.update(tables.Locations, props.id, v_data.value);
    emits('visible', false);
  }
};


onMounted(async() => {
  v_dialog_visible.value = props.dialogVisible;
  await m.load();
});

</script>
