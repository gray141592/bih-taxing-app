<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="2">
        <v-btn
          color="gray darken-1"
          :disabled="nepotpunIzvjestaj"
          @click="downloadTsv">
          Preuzmi csv izvjestaj
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="gray darken-1"
          :disabled="!izvjestajPreuzet"
          @click="povratak">
          Povratak
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
    >
      {{ obavjestenje }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="unesiDobavljaca"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-form ref="dobavljac">
          <v-card-title>
            <v-row justify="space-between">
              <v-col>
                <span class="headline">Unesi dobavljaca</span>
              </v-col>
              <v-col>
                {{dobavljac.puniNaziv}}
              </v-col>
            </v-row>

          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  justify="center"
                >
                  <v-text-field
                    label="Naziv dobavljaca"
                    v-model="dobavljac.naziv"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Sjediste dobavljaca"
                    v-model="dobavljac.sjediste"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="PDV broj dobavljaca"
                    v-model="dobavljac.pdvBroj"
                    :required="!dobavljac.jib"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="JIB dobavljaca"
                    v-model="dobavljac.jib"
                    :required="!dobavljac.pdvBroj"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="unesiDobavljaca = false"
            >
              Zatvori
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="noviDobavljac"
            >
              Sacuvaj
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table
    :headers="tsvHeader"
    :items="csv"
    :expanded.sync="expanded"
    single-expand
    item-key="brojFakture"
    show-expand
    class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card>
            <v-card-title>

              <v-row justify="space-between">
                <v-col>
                  Faktura br: {{item.brojFakture}}
                </v-col>
                <v-col>
                  <span>
                    {{item.dobavljac && item.dobavljac.naziv}}
                  </span>
                </v-col>
                <v-col class="v-card__subtitle">
                  <span>{{item.dobavljac && item.dobavljac.sjediste}}</span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle>

            </v-card-subtitle>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="item.tipDokumenta"
                      :items="tipoviDokumenata"
                      label="Tip dokumenta"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="datumFakture"
                      label="Datum fakture"
                      prepend-icon="mdi-calendar"/>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="datumPrijema"
                      label="Datum prijema fakture"
                      prepend-icon="mdi-calendar"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.bezPDV"
                      type="number"
                      label="Iznos fakture bez PDV-a" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.saPDV"
                      type="number"
                      label="Iznos fakture sa PDV-om" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.pausalnaNaknada"
                      type="number"
                      label="Iznos pausalne naknade" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDV"
                      type="number"
                      label="Iznos ulaznog PDV-a" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDVo"
                      type="number"
                      label="Ulazni PDV koji se može odbiti" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDVno"
                      type="number"
                      label="Ulazni PDV koji se ne može odbiti" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDVo32"
                      type="number"
                      label="Ulazni PDV polje 32" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDVo32"
                      type="number"
                      label="Ulazni PDV polje 32" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDVno33"
                      type="number"
                      label="Ulazni PDV polje 33" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ulazniPDVno34"
                      type="number"
                      label="Ulazni PDV polje 34" />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="savucajTsv(item)"
                >
                  Sacuvaj izmjene
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </td>
      </template>
      <template v-slot:[`item.dobavljac`]="{ item }">
        <v-chip
          :color="item.neispravan ? 'orange' : 'green'"
          @click="item.neispravan && openDialog(item.nazivDobavljaca, item.jmbgDobavljaca)"
          dark
        >
          {{ item.neispravan ? item.nazivDobavljaca : item.dobavljac.naziv }}
        </v-chip>
      </template>
      <template v-slot:[`item.datumFakture`]="{ item }">
          {{ formatDate(item.datumFakture) }}
      </template>
      <template v-slot:[`item.datumPrijema`]="{ item }">
          {{ formatDate(item.datumPrijema) }}
      </template>
      <template v-slot:[`item.iznos.bezPDV`]="{ item }">
          {{ formatNumber(item.iznos.bezPDV) }}
      </template>
      <template v-slot:[`item.iznos.saPdv`]="{ item }">
          {{ formatNumber(item.iznos.saPDV) }}
      </template>
      <template v-slot:[`item.iznos.ulazniPDV`]="{ item }">
          {{ formatNumber(item.iznos.ulazniPDV) }}
      </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import moment from 'moment';
import { SlogNabavke } from '@/models/pdv';

import csvPage from '@/constants/csvPage';

export default Vue.extend({
  name: 'About',
  data: (): DataModel => ({
    unesiDobavljaca: false,
    izvjestajPreuzet: false,
    tsvHeader: csvPage.tsvHeader,
    tipoviDokumenata: csvPage.tipoviDokumenata,
    datumPrijema: '',
    datumFakture: '',
    expanded: [],
    dobavljac: {},
    obavjestenje: '',
    snackbar: false,
  }),
  computed: {
    nepotpunIzvjestaj() {
      return this.$store.state.tsvIzvjestaj.some((red: any) => red.neispravan);
    },
    csv() {
      return this.$store.state.tsvIzvjestaj || [];
    },
    dobavljacForma(): Vue & { validate: () => boolean } {
      return this.$refs.dobavljac as Vue & { validate: () => boolean };
    },
    formatDate() {
      return (date: Date): string => moment(date).format('DD.MM.YYYY');
    },
    formatNumber() {
      return (number: string | number) => (typeof number === 'number' ? number.toFixed(2) : number);
    },
  },
  methods: {
    openDialog(puniNaziv: string, jmbgDobavljaca: string) {
      const naziv = puniNaziv.slice(0, puniNaziv.lastIndexOf(' '));
      const sjediste = puniNaziv.slice(puniNaziv.lastIndexOf(' ') + 1);
      const pdvId = jmbgDobavljaca.length > 12 ? 'jib' : 'pdvBroj';
      this.dobavljac = {
        puniNaziv,
        [pdvId]: jmbgDobavljaca,
        naziv,
        sjediste,
      };
      this.unesiDobavljaca = true;
    },
    noviDobavljac() {
      if (!this.dobavljacForma.validate()) {
        return;
      }

      this.$store.dispatch('noviDobavljac', {
        naziv: this.dobavljac.naziv,
        sjediste: this.dobavljac.sjediste,
        jib: this.dobavljac.jib,
        pdvBroj: this.dobavljac.pdvBroj,
      });
      this.dobavljac = {};
      this.unesiDobavljaca = false;
      this.obavjestenje = 'Dobavljac sacuvan';
      this.snackbar = true;
    },
    savucajTsv(item: SlogNabavke) {
      this.$store.commit('sacuvajTsv', {
        ...item,
        datumPrijema: moment(this.datumPrijema, 'DD.MM.YYYY').toDate(),
        datumFakture: moment(this.datumFakture, 'DD.MM.YYYY').toDate(),
      });
      this.obavjestenje = 'Red sacuvan';
      this.snackbar = true;
    },
    downloadTsv() {
      const csv = this.$store.getters.generisiCsv;
      const anchor = document.createElement('a');
      anchor.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
      anchor.target = '_blank';
      anchor.download = this.$store.getters.nazivCsvFajla;
      anchor.click();
      this.izvjestajPreuzet = true;
    },
    povratak() {
      this.$store.commit('resetuj');
      this.$router.push('/');
    },
  },
  watch: {
    expanded: {
      deep: true,

      // We have to move our method to a handler field
      handler() {
        if (this.expanded.length) {
          this.datumPrijema = moment(this.expanded[0].datumPrijema).format('DD.MM.YYYY');
          this.datumFakture = moment(this.expanded[0].datumFakture).format('DD.MM.YYYY');
        }
      },
    },
  },
});
interface DataModel {
  unesiDobavljaca: boolean;
  tsvHeader?: any;
  tipoviDokumenata: any;
  expanded: Array<any>;
  dobavljac: {
      puniNaziv?: string;
      naziv?: string;
      sjediste?: string;
      jib?: string;
      pdvBroj?: string;
  };
  obavjestenje: string;
  snackbar: boolean;
  izvjestajPreuzet: boolean;
  datumPrijema: string;
  datumFakture: string;
}
</script>
<style lang="scss">
.warning {
  background-color: #FB4;
}
</style>
