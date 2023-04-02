<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="col text-center" v-for="(button, index) in v_buttons" :key="index">
      <q-btn v-if="button.icon === ''"
             :color="button.activated ? 'green':''"
             :label="button.label"
             :text-color="button.activated ? 'white': 'black'"
             round
             @click="m.section(index)">
        <q-tooltip v-if="button.helptext !== ''">{{button.helptext}}</q-tooltip>
      </q-btn>
      <q-btn v-if="button.icon !== ''"
             :color="button.activated ? 'green':''"
             :icon="'las ' + button.icon"
             :text-color="button.activated ? 'white': 'black'"
             round
             @click="m.section(index)">
        <q-tooltip v-if="button.helptext !== ''">{{button.helptext}}</q-tooltip>
      </q-btn>
    </div>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-for="(button, index) in v_buttons" :key="index">
      <div class="col" v-if="button.activated">
        <component :is="button.component" :text-id="props.textId"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import charactersComponent     from 'components/writePage/charactersComponent.vue';
import locationComponent       from 'components/writePage/locationsComponent.vue';
import objectComponent         from 'components/writePage/objectsComponent.vue';

const props = defineProps(['textId']);

watch(() => props.textId, async(newValue, oldValue) => {
});

const m = {
  section: (index) => {
    v_buttons.value[index].activated = !v_buttons.value[index].activated;
  }
};

const v_buttons = ref([{
  name:      'C',
  activated: false,
  icon:      'la-user',
  helptext:  'Personen',
  component: charactersComponent
}, {
  name:      'O',
  activated: false,
  icon:      'la-city',
  helptext:  'Orte',
  component: locationComponent
}, {
  name:      'G',
  activated: false,
  icon:      'la-volleyball-ball',
  helptext:  'Objekte',
  component: objectComponent
}]);

onMounted(async() => {
});
</script>
