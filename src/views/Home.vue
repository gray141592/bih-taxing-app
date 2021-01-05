<template>
  <v-form ref="form" v-model="valid">
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="tipIzvjestaja"
          :items="tipoviIzvjestaja"
          :rules="[v => !!v || 'Potrebno unjeti tip']"
          label="Tip izvjestaja"
          required
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="godina"
          :items="godine"
          :rules="[v => !!v || 'Potrebno unjeti godinu']"
          label="Godina"
          required
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="mjesec"
          :items="mjeseci"
          :rules="[v => !!v || 'Potrebno unjeti mjesec']"
          label="Mjesec"
          required
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="pdvBroj"
          :rules="pdvBrojPravila"
          :counter="12"
          label="PDV broj obveznika"
          required
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="4">
          <v-text-field
          v-model="brojDatoteke"
          type="number"
          min="1"
          label="Broj datoteke u poreskom periodu"
          required />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          name="input-7-4"
          label="Unesite kolone iz tabele"
          required
          v-model="tsv"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="generisi"
      >
        Prikazi csv
      </v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import tsvPage from '@/constants/tsvPage';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    tipoviIzvjestaja: tsvPage.tipoviIzvjestaja,
    godine: tsvPage.godine,
    pdvBrojPravila: tsvPage.pdvBrojPravila,
    mjeseci: tsvPage.mjeseci,
    valid: false,
    godina: null,
    mjesec: null,
    pdvBroj: null,
    tsv: null,
    brojDatoteke: 1,
    tipIzvjestaja: tsvPage.tipoviIzvjestaja[0].value,
  }),
  computed: {
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean };
    },
  },
  methods: {
    generisi() {
      this.form.validate();
      if (!this.valid) {
        return;
      }
      this.$store.dispatch({
        type: this.tipIzvjestaja,
        godina: this.godina,
        mjesec: this.mjesec,
        pdvBrojObveznika: this.pdvBroj,
        redniBrojDatoteke: this.brojDatoteke,
        tsv: this.tsv,
      });
      this.$router.push('/about');
    },
  },
});
</script>
