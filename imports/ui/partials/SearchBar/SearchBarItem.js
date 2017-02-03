import { TemplateController } from 'meteor/space:template-controller';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './SearchBarItem.html';

TemplateController('SearchBarItem', {
  events: {
    'click .search-item'() {
      Session.set('showModal', true);
      Session.set('MemoDetailId', this.data._id);
      Session.set('showMemoDetail', true);
      return false;
    }
  },

  helpers: {
    providerUrl() {
      let url = this.data.provider_url;
      if (url) {
        let urlNoProtocol = url.replace(/^https?\:\/\//i, "");
        return urlNoProtocol;
      } else {
        return false;
      }
    }
  }
});
