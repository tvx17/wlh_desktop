<template>
  <q-dialog v-model="v_structure_dialog" :position="v_structure_dialog_position" seamless
  >
    <q-card>
      <div class="q-pa-md q-gutter-sm">
        <q-bar class="bg-white">
          Struktur
          <q-space/>
          <q-btn icon="close" dense flat @click="v_structure_dialog = false"/>
          <q-btn icon="las la-arrow-right" dense flat @click="v_structure_dialog_position = 'right'" v-if="v_structure_dialog_position !== 'right'"/>
          <q-btn icon="las la-arrow-left" dense flat @click="v_structure_dialog_position = 'left'" v-if="v_structure_dialog_position !== 'left'"/>
          <q-btn icon="las la-arrow-down" dense flat @click="v_structure_dialog_position = 'bottom'" v-if="v_structure_dialog_position !== 'bottom'"/>
        </q-bar>

        <q-bar class="bg-white">
          <q-btn-group flat stretch class="full-width">
            <q-btn icon="add" dense flat class="full-width"/>
            <q-btn icon="edit" dense flat class="full-width"/>
          </q-btn-group>
        </q-bar>
        <q-input ref="filterRef" filled v-model="v_structure_filter" label="Filter" dense>
          <template v-slot:append>
            <q-icon v-if="v_structure_filter !== ''" name="clear" class="cursor-pointer" @click="m_resetFilter"/>
          </template>
        </q-input>
        <div>{{v_structure_nodes}}</div>
        <q-tree
          ref="treeRef"
          v-model:selected="v_structure_selected_node"
          :filter="v_structure_filter"
          dense
          :nodes="v_structure_nodes"
          node-key="id"
          label-key="name"
          @lazy-load="m_onLazyLoad"
          @update:selected="m_selectedNode"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import requests                from 'src/app/data/requests';
import tables                  from 'src/app/types/tables';

const filterRef = ref(null);
const treeRef   = ref(null);
const props     = defineProps(['visible']);
const emitters  = defineEmits(['nodeSelected']);

const v_structure_dialog          = ref(false);
const v_structure_dialog_position = ref('bottom');
const v_structure_filter          = ref('');
const v_structure_selected_node   = ref('');
const v_structure_nodes           = ref([]);

watch(() => props.visible, (newValue, oldValue) => {
  v_structure_dialog.value = newValue;
});

const m_selectedNode = async(key) => {
  const node = treeRef.value.getNodeByKey(key);
  emitters('nodeSelected', node);
  //
  // v_content.value = await requests.getBy(tables.Texts, 'parent', key);
  // console.log(v_content.value);
};
const m_resetFilter  = () => {
  v_structure_filter.value = '';
  filterRef.value.focus();
};
const m_onLazyLoad   = async({
                               node,
                               key,
                               done,
                               fail
                             }) => {
  const childNodes = await requests.getBy(tables.Structure, 'parent', key);
  done([childNodes]);
};

onMounted(async() => {
  v_structure_dialog.value = props.visible;
  v_structure_nodes.value.push(await requests.getBy(tables.Structure, 'parent', 0));
  v_structure_dialog.value = true;
});
</script>
