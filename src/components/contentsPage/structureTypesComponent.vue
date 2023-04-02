<template>
  <div v-if="v_structure_types">
    <div class="row" v-for="(structureType, index) in v_structure_types" :key="index" style="border: 1px solid;">
      <div class="row">
        <div class="col text-h6">{{structureType.name}}</div>
      </div>
      <div class="row">
        <div class="col">Aktiv: {{structureType.active}}</div>
        <div class="col">Kann Text enthalten: {{structureType.can_contain_text}}</div>
      </div>
      <div class="row" v-if="structureType.can_contain.length > 0">
        <div class="col" v-for="(subtype, sIndex) in structureType.can_contain" :key="sIndex">
          {{subtype.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';


const m = {};

const v_structure_types = ref([]);

onMounted(async() => {
  // v_structure_types.value = await requests.getAll(tables.StructureTypes);
  v_structure_types.value.forEach((structureType) => {
    const can_contain         = structureType.can_contain;
    structureType.can_contain = [];
    can_contain.forEach(async(id) => {
      // structureType.can_contain.push(await requests.getBy(tables.StructureTypes, 'id', id));
    });
  });
});
</script>
