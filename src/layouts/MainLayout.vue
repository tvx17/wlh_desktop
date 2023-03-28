<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          WLH
        </q-toolbar-title>
        <q-btn :disable="v_settings['setup'] == null || v_settings['setup'] === false" dense flat label="App" to="/app"/>
        <q-space/>
        <q-btn label="Inhalt" dense flat :disable="v_settings['setup'] == null || v_settings['setup'] === false" to="/content"/>
        <q-space/>
        <q-btn label="Schreiben" dense flat :disable="v_settings['setup'] == null || v_settings['setup'] === false" to="/write"/>
        <q-space/>
        <q-btn label="Planen" dense flat disable to="plan"/>
        <q-space/>
        <div>v{{version['major']}}.{{version['minor']}}.{{version['patch']}}</div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>

import {onMounted}               from 'vue';
import {variables as v_settings} from 'src/variables/settings';
import version                   from 'src/misc/version';

onMounted(() => {
});

</script>
