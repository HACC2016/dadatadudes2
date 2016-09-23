export default [{
  label: 'Asssessment',
  name: 'assessmentId',
  filter: {
    values: [{
      label: 'Assessment',
      value: 'no'
    }, {
      label: 'No Assessment',
      value: 'yes'
    }]
  },
  hidden: true
}, {
  label: 'Last Name',
  name: 'lastName',
  hidden: true
}, {
  label: 'First Name',
  name: 'firstName',
  hidden: true
},{
  label: 'Status',
  name: 'status',
}, {
  label: 'Name',
  name: 'name',
},{
  label: 'Age',
  name: 'age',
}, {
  label: 'Gender',
  name: 'gender',
},{
  label: 'Ethnicity',
  name: 'ethnicity',
}, {
  label: 'Employment Status',
  name: 'employmentStatus',
},
{
  label: 'District ID',
  name: 'districtId',
  sort: {
    direction: 'asc'
  }
}];
