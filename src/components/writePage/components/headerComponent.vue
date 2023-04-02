<template>
  <q-bar class="bg-white">
    <div class="text-weight-bolder">Personen</div>
    <q-space/>
    <q-btn icon="add" dense flat/>
    <q-btn icon="edit" dense flat/>
  </q-bar>
</template>

<script setup>
import {onMounted} from 'vue';

const emitters = defineEmits(['add', 'edit']);

const m = {};

onMounted(async() => {
});
</script>
