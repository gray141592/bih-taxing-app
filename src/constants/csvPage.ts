const csvPage = {
  tsvHeader: [
    {
      align: 'start', sortable: false, value: 'tipDokumenta', text: 'Tip Dokumenta',
    },
    {
      align: 'start', sortable: false, value: 'brojFakture', text: 'Broj Fakture',
    },
    {
      align: 'start', sortable: false, value: 'datumFakture', text: 'Datum fakture',
    },
    {
      align: 'start', sortable: false, value: 'datumPrijema', text: 'Datum prijema fakture',
    },
    {
      align: 'start', sortable: false, value: 'dobavljac', text: 'Naziv dobavljača',
    },
    {
      align: 'start', sortable: false, value: 'iznos.bezPDV', text: 'Iznos bez PDV-a',
    },
    {
      align: 'start', sortable: false, value: 'iznos.saPDV', text: 'Iznos sa PDV-om',
    },
    {
      align: 'start', sortable: false, value: 'iznos.ulazniPDV', text: 'Ulazni PDV',
    },
  ],
  tipoviDokumenata: [
    { value: '01', text: 'Fakture iz zemlje' },
    { value: '02', text: 'Faktura za vlastitu potrošnju' },
    { value: '03', text: 'Dati avansi' },
    { value: '04', text: 'JCI (Uvoz)' },
    { value: '05', text: 'Ostalo' },
  ],
};

export default csvPage;
