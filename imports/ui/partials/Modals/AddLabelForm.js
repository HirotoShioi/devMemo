import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Session } from 'meteor/session';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from 'meteor/anti:i18n';
import './AddLabelForm.html';

TemplateController('AddLabelForm', {
  state: {
    labelColorsFirst: [
      {value: "#40c4ff"},
      {value: "#18ffff"},
      {value: "#64ffda"},
      {value: "#69f0ae"},
      {value: "#b2ff59"},
    ],
    labelColorsSecond: [
      {value: "#ff5252"},
      {value: "#ff4081"},
      {value: "#e040fb"},
      {value: "#b388ff"},
      {value: "#8c9eff"},
    ],
  },
  onRendered() {
    Session.set('addLabelSelectedColor', "#40c4ff");
  },
  helpers: {
    selectedColor() {
      return Session.get('addLabelSelectedColor');
    },
    schema() {
      const schema = new SimpleSchema({
        labelName: {
          type: String,
          label: function() {return i18n('collection.label.name');},
          max: 15,
        },
      });
      return schema;
    },
  },
  events: {
    'click .fa-close'() {
      Session.set('labelFormShow', false);
    },
    'click .color-chooser-color'(event) {
      const selectedColor = event.target.attributes.data.value;
      Session.set('addLabelSelectedColor', selectedColor);
    },
  }
});
const hooksObject = {
  onSubmit: function(insertDoc) {
    this.event.preventDefault();
    let labelColor = Session.get('addLabelSelectedColor');
    let labelDoc = {
      name: insertDoc.labelName,
      color: labelColor,
    };
    Session.set('showModal', false);
    Meteor.call('addLabel', labelDoc, (err, result)=>{
      resetModalForm();
      if (err) {
        return;
      }
      if (result) {
        this.resetForm();
      }
    });
    this.done();
  },
};
AutoForm.hooks({
  addLabel: hooksObject
});
