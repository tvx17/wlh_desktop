<template>
  <q-page class="flex">
    <q-splitter
      v-model="v_splitter"
      style="width: 100%;"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">{{$t('pages.contents.contentType')}}</div>
          <div class="q-my-md">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section @click="m.showComponent('structureTypes')">{{$t('pages.contents.structureTypes')}}</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section @click="m.showComponent('characters')">{{$t('pages.contents.characters')}}</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="m.showComponent('locations')">
                <q-item-section>{{$t('pages.contents.locations')}}</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="m.showComponent('objects')">
                <q-item-section>{{$t('pages.contents.objects')}}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="q-my-md">
            <component :is="v_currentComponent" :options="v_componentOptions"/>
          </div>
        </div>
      </template>

    </q-splitter>
  </q-page>
</template>

<script setup>
import {onMounted, ref} from 'vue';
// import structureTypesComponent from 'components/contentsPage/structureTypesComponent.vue';
import viewComponent    from 'src/components/viewComponent.vue';

const m = {
  showComponent: (componentName) => {
    switch(componentName){
      case 'structureTypes':
        v_currentComponent.value = structureTypesComponent;
        break;
      case 'characters':
        v_componentOptions.value = {
          url:                'character',
          componentTitle:     'Charaktere',
          dialogNewItemTitle: 'Neuer Charakter',
          dialogNewItemText:  'Name des neuen Charakters'
        };
        v_currentComponent.value = viewComponent;
        break;
      case 'locations':
        v_componentOptions.value = {
          url:                'location',
          componentTitle:     'Orte',
          dialogNewItemTitle: 'Neuer Ort',
          dialogNewItemText:  'Name des neuen Orts'
        };
        v_currentComponent.value = viewComponent;
        break;
      case 'objects':
        v_componentOptions.value = {
          url:                'object',
          componentTitle:     'Objekte',
          dialogNewItemTitle: 'Neues Objekt',
          dialogNewItemText:  'Name des neuen Objekts'
        };
        v_currentComponent.value = viewComponent;
        break;
    }
  }
};

const v_componentOptions = ref({});
const v_currentComponent = ref();
const v_splitter         = ref(20);


onMounted(() => {

});
</script>
