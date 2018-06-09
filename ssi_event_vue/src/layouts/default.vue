<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          SSI Events Application
          <div slot="subtitle">Entra in Azione per gli Oceani!</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">

      <q-list-header>Actions</q-list-header>
      <q-list separator>
        <q-item :to="{ name: 'home'}">
          <q-item-side icon="home" />
          <q-item-main label="Home"/>
        </q-item>

        <q-collapsible icon="event" label="Events" opened>
          <q-item link to="/events/search">
            <q-item-side icon="search" />
            <q-item-main label="Search" />
          </q-item>          
          <q-item link to="/events/import">
            <q-item-side icon="unarchive" />
            <q-item-main label="Import"/>
          </q-item>
          <q-item link to="/events/export">
            <q-item-side icon="archive" />
            <q-item-main label="Export"/>
          </q-item>
        </q-collapsible>

        <q-item :to="{ name: 'hello', params: { name: 'Pippo', initialEnthusiasm: 5}}">
          <q-item-side icon="mood" />
          <q-item-main label="Hello"/>
        </q-item>        
        
        <q-item link to="/calendar">
          <q-item-side icon="date_range"/>
          <q-item-main label="Calendar"/>
        </q-item>
        
        <q-item link to="/spreadsheet">
          <q-item-side icon="view_list"/>
          <q-item-main label="Spreadsheet"/>
        </q-item>
        
        <q-item link to="/scheduler">
          <q-item-side icon="scheduler"/>
          <q-item-main label="Scheduler"/>
        </q-item>

        <q-item link to="/trash">
          <q-item-side icon="delete" />
          <q-item-main label="Trash"/>
        </q-item>

        <q-item link to="/docs">
          <q-item-side icon="school" />
          <q-item-main label="Docs"/>
        </q-item>       

      </q-list> 

    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { openURL } from "quasar";
import { Platform } from "quasar";
export default Vue.extend({
  data() {
    return {
      leftDrawerOpen: Platform.is.desktop
    };
  },
  methods: {
    openURL
  },
  name: "LayoutDefault"
});
</script>
