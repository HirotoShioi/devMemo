import { Session } from 'meteor/session';
import { TemplateController } from 'meteor/space:template-controller';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from 'meteor/anti:i18n';
import './ViewOptions.html';

TemplateController('ViewOptions', {
  helpers: {
    check() {
      return Session.get('hideExpired');
    },
    schema() {
      const schema = new SimpleSchema({
        sortFilter: {
          type: String,
          label: function() { return i18n('gallery.filter.label');},
          defaultValue: "newest",
          allowedValues: ['mostClicked', 'byLabels', 'newest'],
          autoform: {
            options: [
              {label: function() { return i18n('gallery.filter.newest');}, value: "newest"},
              {label: function() { return i18n('gallery.filter.mostClicked');}, value: "mostClicked"},
              {label: function() { return i18n('gallery.filter.byLabels');}, value: "byLabels"},
            ]
          }
        }
      });
      return schema;
    },
  },

  events: {
    'click .card-view'() {
      Session.set('ListMode', false);
    },
    'click .list-view'() {
      Session.set('ListMode', true);
    },
    'click .toggle-bookmark-view'(event) {
      let isChecked = event.target.checked;
      Session.set('hideExpired', isChecked);
    }
  },
});
