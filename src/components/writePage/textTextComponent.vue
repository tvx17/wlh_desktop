<template>
  <hr/>
  <div class="q-pa-md q-gutter-sm" v-if="v_content !== undefined">
    <div class="row">
      <div class="col">
        <q-btn label="save" class="full-width" flat dense @click="m.saveData()"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input label="Überschrift" v-model="v_content.headline"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-editor v-model="v_content.text"/>
        <div>{{v_content}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import requests                from 'src/app/data/requests';
import tables                  from 'src/app/types/tables';
import helper                  from 'src/app/helper';

const props    = defineProps(['textParentId']);
const emitters = defineEmits(['textLoaded']);

const v_content = ref(undefined);

const m = {
  saveData: () => {
    requests.update(tables.Texts, v_content.value.id, v_content.value);
    helper.displayNotify('Gespeichert', 'Der Text wurde erfolgreich gespeichert.');
  }
};

watch(() => props.textParentId, async(newValue, oldValue) => {
  v_content.value = await requests.getBy(tables.Texts, 'parent', newValue);
  emitters('textLoaded', v_content.value.id);
});

onMounted(async() => {
  v_content.value = await requests.getBy(tables.Texts, 'parent', props.textParentId);
  emitters('textLoaded', v_content.value.id);
});
</script>
