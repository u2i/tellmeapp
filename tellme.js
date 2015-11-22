Fields = new Mongo.Collection("fields");
Meteor.methods({
  addField: function (f_name, f_value) {

    // Insert a task into the collection
    Fields.insert({
      userId: Meteor.userId(),
      field_name: f_name,
      field_value: f_value,
      createdAt: new Date() // current time
    });

  },
  deleteField: function (field_id) {
    Fields.remove(field_id);
  }
});
