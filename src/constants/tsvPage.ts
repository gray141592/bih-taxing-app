const tsvPage = {
  tipoviIzvjestaja: [{
    text: 'Nabavke',
    value: 'citanjeUlaza',
  }, {
    text: 'Isporuke',
    value: 'citanjeIzlaza',
  }],
  csvPageLink: (tipIzvjestaja: string): string => {
    if (tipIzvjestaja === 'citanjeUlaza') {
      return '/ulaz';
    }
    return '/izlaz';
  },
  godine: [{
    text: '2020',
    value: '20',
  }, {
    text: '2021',
    value: '21',
  }, {
    text: '2022',
    value: '22',
  }],
  mjeseci: [{
    text: 'Januar',
    value: '01',
  }, {
    text: 'Februar',
    value: '02',
  }, {
    text: 'Mart',
    value: '03',
  }, {
    text: 'April',
    value: '04',
  }, {
    text: 'Maj',
    value: '05',
  }, {
    text: 'Jun',
    value: '06',
  }, {
    text: 'Jul',
    value: '07',
  }, {
    text: 'Avgust',
    value: '08',
  }, {
    text: 'Septembar',
    value: '09',
  }, {
    text: 'Oktobar',
    value: '10',
  }, {
    text: 'Novembar',
    value: '11',
  }, {
    text: 'Decembar',
    value: '12',
  }],
  pdvBrojPravila: [
    (v: string) => !!v || 'Potrebno unjeti PDV broj',
    (v: string) => (v && v.length === 12) || 'PDV broj obveznika mora imati 12 brojeva',
    (v: string) => RegExp(/^[0-9]*$/g).test(v) || 'PDV broj obveznika sadrzi samo brojeve',
  ],
};

export default tsvPage;
