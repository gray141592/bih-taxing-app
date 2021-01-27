const csvPage = {
  tsvHeader: (tipDatoteke: string) => ((tipDatoteke === '1')
    ? [
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
    ]
    : [
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
        align: 'start', sortable: false, value: 'nabavljac', text: 'Naziv nabavljaca',
      },
      {
        align: 'start', sortable: false, value: 'iznos.osnovicaZaPDVObvezniku', text: 'Iznos bez PDV-a',
      },
      {
        align: 'start', sortable: false, value: 'iznos.ukupno', text: 'Iznos sa PDV-om',
      },
      {
        align: 'start', sortable: false, value: 'iznos.izlazniPDVObvezniku', text: 'Izlazni PDV',
      },
    ]),
  tipoviDokumenata: (tipDatoteke: string) => ((tipDatoteke === '1')
    ? [
      { value: '01', text: 'Fakture iz zemlje' },
      { value: '02', text: 'Faktura za vlastitu potrošnju' },
      { value: '03', text: 'Dati avansi' },
      { value: '04', text: 'JCI (Uvoz)' },
      { value: '05', text: 'Ostalo' },
    ]
    : [
      { value: '01', text: 'Ulazne fakture za robu i usluge iz zemlje' },
      { value: '02', text: 'Ulazna faktura za vlastitu potrošnju (Vanposlovne svrhe)' },
      { value: '03', text: 'Ulazna faktura - avansna (Dati avansi)' },
      { value: '04', text: 'JCI (Uvoz)' },
      { value: '05', text: 'Ostalo (Fakture za usluge primljene iz inostranstva itd)' },
    ]),
};

export default csvPage;
