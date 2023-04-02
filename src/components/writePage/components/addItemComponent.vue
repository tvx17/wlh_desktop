<template>
  <q-dialog v-model="v_dialog">
    <q-card>
      <q-card-section>Charaktere</q-card-section>
      <q-separator/>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import db                      from 'src/app/database/db.js_';

const props = defineProps(['dialogVisible', 'textId']);

const v_dialog = ref(false);

watch(() => props.dialogVisible, async(newValue, oldValue) => {
  v_dialog.value = newValue;
  if(newValue){
    await m.loadItemsForScene();
  }
});

const m = {
  temp:              () => {
    //Just a method without any functions
  },
  loadItemsForScene: async() => {
    let ids = [];
    v_characters_in_scene.value.forEach((character) => {
      ids.push(character.id);
    });
    v_chooseable_characters.value = await db.characters.where('id').notEqual([]).toArray();
  }
};

onMounted(async() => {
  v_dialog.value = props.dialogVisible;
});
</script>
