<template>
  <q-page class="flex">
    <q-splitter
      v-model="v_splitter"
      style="width: 100%;"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Anwendung</div>
          <div class="q-my-md">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section @click="m.showComponent('projects')">Projekte</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section @click="m.showComponent('users')">Benutzer/-innen</q-item-section>
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
import viewComponent    from 'src/components/viewComponent.vue';

const m = {
  showComponent: (componentName) => {
    switch(componentName){
      case 'projects':
        v_componentOptions.value = {
          url:                'project',
          componentTitle:     'Projekte',
          dialogNewItemTitle: 'Neues Projekt',
          dialogNewItemText:  'Name des neuen Projekts'
        };
        v_currentComponent.value = viewComponent;
        break;
      case 'users':
        v_componentOptions.value = {
          url:                'user',
          componentTitle:     'Benutzer/-innen',
          dialogNewItemTitle: 'Neue Benutzerin / neuer Benutzer',
          dialogNewItemText:  'Name des neuen Benutzers /der neuen Benutzerin'
        };
        v_currentComponent.value = viewComponent;
        break;
    }
  }
};

const v_componentOptions = ref({
                                 url:                'project',
                                 componentTitle:     'Projekte',
                                 dialogNewItemTitle: 'Neues Projekt',
                                 dialogNewItemText:  'Name des neuen Projekts'
                               });
const v_currentComponent = ref(viewComponent);
const v_splitter         = ref(20);


onMounted(() => {

});
</script>
