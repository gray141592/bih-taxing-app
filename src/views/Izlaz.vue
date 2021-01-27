<!-- eslint-disable max-len -->
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
                {{nabavljac.puniNaziv}}
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
                    label="Naziv nabavljaca"
                    v-model="nabavljac.naziv"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Sjediste nabavljaca"
                    v-model="nabavljac.sjediste"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="PDV broj nabavljaca"
                    v-model="nabavljac.pdvBroj"
                    :required="!nabavljac.jib"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="JIB nabavljaca"
                    v-model="nabavljac.jib"
                    :required="!nabavljac.pdvBroj"
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
                    {{item.nabavljac && item.nabavljac.naziv}}
                  </span>
                </v-col>
                <v-col class="v-card__subtitle">
                  <span>{{item.nabavljac && item.nabavljac.sjediste}}</span>
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
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ukupno"
                      type="number"
                      label="Iznos fakture" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.internaFaktura"
                      type="number"
                      label="Iznos interne fakture u vanposlovne svrhe" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.izvoznaIsporuka"
                      type="number"
                      label="Iznos fakture za izvozne isporuke" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.ostaleIsporukeOslobodjeno"
                      type="number"
                      label="Iznos fakture za ostale isporuke oslobođene plaćanja PDV-a" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.osnovicaZaPDVObvezniku"
                      type="number"
                      label="Osnovica za obračun PDV-a za isporuku izvršenu registrovanom obvezniku PDV-a" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.izlazniPDVObvezniku"
                      type="number"
                      label="Iznos izlaznog PDV-a za isporuku izvršenu obvezniku PDV-a" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.osnovicaNeObvavezniku"
                      type="number"
                      label="Osnovica za obračun PDV-a za isporuku izvršenu licu koje nije registrovani obveznik PDV-a" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.izlazniPDVNeObavezniku"
                      type="number"
                      label="Iznos izlaznog PDV-a za isporuku izvršenu licu koje nije registrovani obveznik PDV-a" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.izlazniPDVo32"
                      type="number"
                      label="Iznos izlaznog PDV-a koji se unosi u polje 32 PDV prijave" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.izlazniPDVno33"
                      type="number"
                      label="Iznos izlaznog PDV-a koji se unosi u polje 33 PDV prijave" />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="item.iznos.izlazniPDVno34"
                      type="number"
                      label="Iznos izlaznog PDV-a koji se unosi u polje 34 PDV prijave" />
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
      <template v-slot:[`item.nabavljac`]="{ item }">
        <v-chip
          :color="item.neispravan ? 'orange' : 'green'"
          @click="item.neispravan && openDialog(item.nazivNabavljaca, item.jmbgNabavljaca)"
          dark
        >
          {{ item.neispravan ? item.nazivNabavljaca : item.nabavljac.naziv }}
        </v-chip>
      </template>
      <template v-slot:[`item.datumFakture`]="{ item }">
          {{ formatDate(item.datumFakture) }}
      </template>
      <template v-slot:[`item.iznos.osnovicaZaPDVObvezniku`]="{ item }">
          {{ formatNumber(item.iznos.osnovicaZaPDVObvezniku) }}
      </template>
      <template v-slot:[`item.iznos.ukupno`]="{ item }">
          {{ formatNumber(item.iznos.ukupno) }}
      </template>
      <template v-slot:[`item.iznos.izlazniPDVObvezniku`]="{ item }">
          {{ formatNumber(item.iznos.izlazniPDVObvezniku) }}
      </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import moment from 'moment';
import { SlogIsporuka } from '@/models/pdv';

import csvPage from '@/constants/csvPage';

export default Vue.extend({
  name: 'Ulaz',
  data: (): DataModel => ({
    unesiDobavljaca: false,
    izvjestajPreuzet: false,
    datumFakture: '',
    expanded: [],
    nabavljac: {},
    obavjestenje: '',
    snackbar: false,
  }),
  computed: {
    nepotpunIzvjestaj() {
      return this.$store.state.tsvIzvjestaj.some((red: any) => red.neispravan);
    },
    tsvHeader() {
      return csvPage.tsvHeader(this.$store.state.zaglavlje.tipDatoteke) || [];
    },
    tipoviDokumenata() {
      return csvPage.tipoviDokumenata(this.$store.state.zaglavlje.tipDatoteke) || [];
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
    nazivCsvFajla() {
      return this.$store.getters.nazivCsvFajla(this.$store.state.zaglavlje.tipDatoteke);
    },
  },
  methods: {
    openDialog(puniNaziv: string, jmbgNabavljaca: string) {
      const naziv = puniNaziv.slice(0, puniNaziv.lastIndexOf(' '));
      const sjediste = puniNaziv.slice(puniNaziv.lastIndexOf(' ') + 1);
      const pdvId = jmbgNabavljaca.length > 12 ? 'jib' : 'pdvBroj';
      this.nabavljac = {
        puniNaziv,
        [pdvId]: jmbgNabavljaca,
        naziv,
        sjediste,
      };
      this.unesiDobavljaca = true;
    },
    noviDobavljac() {
      if (!this.dobavljacForma.validate()) {
        return;
      }

      this.$store.dispatch('noviNabavljac', {
        naziv: this.nabavljac.naziv,
        sjediste: this.nabavljac.sjediste,
        jib: this.nabavljac.jib,
        pdvBroj: this.nabavljac.pdvBroj,
      });
      this.nabavljac = {};
      this.unesiDobavljaca = false;
      this.obavjestenje = 'Nabavljac sacuvan';
      this.snackbar = true;
    },
    savucajTsv(item: SlogIsporuka) {
      this.$store.commit('sacuvajIzlaz', {
        ...item,
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
      anchor.download = this.nazivCsvFajla;
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
          this.datumFakture = moment(this.expanded[0].datumFakture).format('DD.MM.YYYY');
        }
      },
    },
  },
});
interface DataModel {
  unesiDobavljaca: boolean;
  expanded: Array<any>;
  nabavljac: {
      puniNaziv?: string;
      naziv?: string;
      sjediste?: string;
      jib?: string;
      pdvBroj?: string;
  };
  obavjestenje: string;
  snackbar: boolean;
  izvjestajPreuzet: boolean;
  datumFakture: string;
}
</script>
<style lang="scss">
.warning {
  background-color: #FB4;
}
</style>
