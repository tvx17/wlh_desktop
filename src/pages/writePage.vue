<template>
  <q-page>
    <div class="row">
      <div class="col">
        <q-btn :color="v_structure_dialog ? 'green' : 'white'"
               :text-color="v_structure_dialog ? 'white': 'black'"
               class="full-width"
               label="Struktur"
               @click="v_structure_dialog = !v_structure_dialog"/>
      </div>
    </div>
    <div>{{v_node}}{{v_node.id}}</div>
    <text-content-component v-if="v_text_id !== -1"
                            :text-id="v_text_id"/>
    <text-text-component v-if="v_node.id !== undefined && v_node.type === 5"
                         :text-parent-id="v_node.id"
                         @text-loaded="m.textLoaded"/>
    <text-structure-component :visible="v_structure_dialog"
                              @node-selected="m.nodeSelected"/>
  </q-page>

</template>

<script setup>
import {onMounted, ref}       from 'vue';
import TextTextComponent      from 'components/writePage/textTextComponent.vue';
import TextStructureComponent from 'components/writePage/textStructureComponent.vue';
import TextContentComponent   from 'components/writePage/textContentComponent.vue';


const props              = {contentId: 1};
const v_node             = ref({});
const v_structure_dialog = ref(true);
const v_text_id          = ref(-1);

const m = {
  nodeSelected: (node) => {
    v_node.value = node;
  },
  textLoaded:   (textId) => {
    v_text_id.value = textId;
  }
};


onMounted(async() => {


});
</script>
