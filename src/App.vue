<template>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue';
import helper      from 'src/app/helper';
import settings    from 'src/variables/settings';
import fakeData    from 'src/app/data/fakeData.js_';
import {useRouter} from 'vue-router';

const router = useRouter();

onMounted(async() => {
  helper.isSetup();
  if(settings.value.setup == null || settings.value.setup === false){
    //router.push({name: 'setup'});
    await fakeData.create();
    helper.setupDone();
    // if(projectId >= 1){
    //   m_helper.setupDone();
    //
    //   await router.push({name: 'index'});
    // }


  }

  //const hallo = await m_conn.emit('app', 'first_run', {});
  //console.log(hallo);
  // api.post('api', {data: 'dota'}).then(
  //   (response) => {
  //     const data = response.data;
  //     console.log(data);
  //   }).catch((error) => {
  //   console.log(error);
  // });

});

</script>
