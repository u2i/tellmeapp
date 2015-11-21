Meteor.startup(function () {
  // code to run on server at startup
  Fields._ensureIndex(
    {'field_name': 'text'},
    {'field_value':'text'},
    {background: 1}
  );


});
