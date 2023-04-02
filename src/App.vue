<template>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue';
import helper      from 'src/app/helper';
import settings    from 'src/variables/settings';
import connection  from 'src/app/connection';
import {useRouter} from 'vue-router';

const router = useRouter();

onMounted(async() => {
  connection.checkApi();
  helper.isSetup();
  if(settings.value.setup == null || settings.value.setup === false){
    //router.push({name: 'setup'});
    helper.setupDone();
  }
});

</script>
