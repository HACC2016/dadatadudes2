export default [{
  label: 'Asssessment',
  name: 'assessmentId',
  filter: {
    values: [{
      label: 'Assessment',
      value: 'yes'
    }, {
      label: 'No Assessment',
      value: 'no'
    }]
  }
}, {
  label: 'Last Name',
  name: 'lastName',
  sort: {
    direction: 'asc'
  },
}, {
  label: 'First Name',
  name: 'firstName',
  sort: {
    direction: 'asc'
  }
}];
