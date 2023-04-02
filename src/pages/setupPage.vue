<template>
  <q-page class="flex flex-center">
    <q-stepper
      style="max-width: 75%;min-width: 75%;"
      v-model="v.step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Willkommen"
        icon="settings"
        :done="v.step > 1"
      >
        <div>
          Willkommen zu WLH - Writer's little helper.
        </div>
        <div>
          Es sieht so aus, als ob Du das Programm zum ersten Mal startest. Deswegen müssen wir ein paar Einstellungen durchführen.
        </div>

        <q-stepper-navigation>
          <q-btn @click="v.step = 2" color="primary" label="Weiter"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Du"
        icon="create_new_folder"
        :done="v.step > 2"
      >
        <div>Wer bist denn Du?</div>
        <div class="text-caption">Ich brauche wenigstens Deinen Vorname.</div>
        <div class="text-weight-bolder"> HINWEIS: Alle Daten können später noch geändert werden.</div>
        <div>
          <q-input v-model="v.user.firstname" label="Vorname" dense clearable :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="v.user.lastname" label="Nachname" dense clearable/>
          <q-input v-model="v.user.pseudonym" label="Pseudonym" dense clearable/>
        </div>

        <q-stepper-navigation>
          <q-btn @click="v.step = 3" color="primary" label="Weiter" :disable="v.user.firstname.length < 4"/>
          <q-btn flat @click="v.step = 1" color="primary" label="Zurück" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Projekt"
        icon="assignment"
      >
        <div>Für Dein erstes Projekt brauche ich noch einen Namen</div>
        <div class="text-weight-bolder"> HINWEIS: Alle Daten können später noch geändert werden.</div>
        <div>
          <q-input label="Projektname" dense clearable :rules="[val => !!val || 'Field is required']" v-model="v.project"/>
        </div>
        <q-stepper-navigation>
          <q-btn @click="v.step = 4" color="primary" label="weiter" :disable="v.project.length < 4"/>
          <q-btn flat @click="v.step = 3" color="primary" label="zurück" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Abschluss"
        icon="add_comment"
      >
        <div>
          Danke für Deine Eingaben. Folgendes habe ich aufgenommen:
          <q-list dense bordered separator>
            <q-item dense>
              <q-item-section avatar>Vorname:</q-item-section>
              <q-item-section>{{v.user.firstname}}</q-item-section>
              <q-item-section>
                <q-btn label="Ändern" dense flat @click="v.step = 2"/>
              </q-item-section>
            </q-item>
            <q-item dense v-if="v.user.lastname !== ''">
              <q-item-section avatar>Nachname:</q-item-section>
              <q-item-section>{{v.user.lastname}}</q-item-section>
              <q-item-section>
                <q-btn label="Ändern" dense flat @click="v.step = 2"/>
              </q-item-section>
            </q-item>
            <q-item dense v-if="v.user.pseudonym !== ''">
              <q-item-section avatar>Pseudonym:</q-item-section>
              <q-item-section>{{v.user.pseudonym}}</q-item-section>
              <q-item-section>
                <q-btn label="Ändern" dense flat @click="v.step = 2"/>
              </q-item-section>
            </q-item>
          </q-list>
          <br/>
          <q-list dense bordered separator>
            <q-item dense>
              <q-item-section avatar>Projekt:</q-item-section>
              <q-item-section>{{v.project}}</q-item-section>
              <q-item-section>
                <q-btn label="Ändern" dense flat @click="v.step = 3"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" @click="m.saveData()"/>
          <q-btn flat @click="v.step = 2" color="primary" label="Back" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script setup>
import {onMounted, ref}          from 'vue';
import {methods as m_data, What} from 'src/app/data/requests';
import {methods as m_helper}     from 'src/app/helper';

import {useRouter} from 'vue-router';

const router = useRouter();

const m = {
  saveData: async() => {
    const userId    = await m_data.new(What.Users, {
      firstname: v.value.user.firstname,
      lastname:  v.value.user.lastname,
      pseudonym: v.value.user.pseudonym
    });
    const projectId = await m_data.new(What.Projects, {
      name:  v.value.project,
      owner: userId
    });
    if(projectId >= 1){
      m_helper.setupDone();

      await router.push({name: 'index'});
    }
  }
};

const v = ref({
                step:    1,
                user:    {
                  firstname: '',
                  lastname:  '',
                  pseudonym: ''
                },
                project: ''
              });

onMounted(() => {

});
</script>
