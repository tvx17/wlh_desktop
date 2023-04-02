<template>
  <!-- Eigene Komponente -->
  <q-scroll-area style="height: 150px;">
    <q-list dense separator v-if="v_items">
      <q-item v-for="(item, index) in v_items" :key="index" @mouseenter="v_buttons_visibility[index].visible = true" @mouseleave="v_buttons_visibility[index].visible = false">
        <q-item-section>{{item.name}}</q-item-section>
        <q-item-section avatar>
          <q-btn-group dense flat v-if="v_buttons_visibility[0].visible">
            <q-btn icon="edit" dense style="font-size: x-small"/>
            <q-btn icon="delete" dense style="font-size: x-small" @click="m.delete(item.id)"/>
          </q-btn-group>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import helper           from 'src/app/helper';
import requests         from 'src/app/data/requests';

const props = defineProps(['textId', 'mappingType', 'table']);

const v_items              = ref([]);
const v_mapping_data       = ref([]);
const v_buttons_visibility = ref([]);

const m = {
  temp:   () => {
    //Just a method without any functions
  },
  delete: async(id) => {
    const result = await helper.promptDialog('Charakter entfernen', 'Möchtest Du wirklich den Charakter von diesem Text lösen?');
    if(result){
      // await m_data.delete(Tables.Mappings, id);
    }
  },
  load:   async() => {
    v_items.value = await requests.getInScene('characters_text', props.textId, 'characters');
  }
};

onMounted(async() => {
  m.load();
});
</script>
