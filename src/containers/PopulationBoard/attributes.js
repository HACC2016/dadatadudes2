export default [{
  label: 'Status',
  name: 'status',
  filter: {
    all: true,
    values: [{
      label: 'Critical',
      value: 'critical'
    },{
      label: 'Warning',
      value: 'warning'
    },{
      label: 'OK',
      value: 'ok'
    }, {
      label: 'Disabled',
      value: 'disabled'
    },
    {
      label: 'Unknown',
      value: 'unknown'
    }]
  },
  status: true
}];
