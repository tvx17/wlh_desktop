<template>
  <q-card flat bordered style="min-width: 250px;">

    <q-card-section>
      <header-component @add="m.temp()" @edit="m.temp()"/>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <items-component :text-id="v_text_id" mapping-type="character_text" table="characters"/>
    </q-card-section>
  </q-card>
  <add-item-component :text-id="v_text_id" :dialog-visible="v_dialog_visible"/>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import HeaderComponent         from 'components/writePage/components/headerComponent.vue';
import ItemsComponent          from 'components/writePage/components/itemsComponent.vue';
import AddItemComponent        from 'components/writePage/components/addItemComponent.vue';


const props = defineProps(['textId']);

const v_text_id        = ref(-1);
const v_dialog_visible = ref(false);

watch(() => props.textId, async(newValue, oldValue) => {
  v_text_id.value = newValue;
});

const m = {
  temp: () => {
    //Just a method without any functions
  }
};

onMounted(async() => {
  v_text_id.value = props.textId;
});
</script>
