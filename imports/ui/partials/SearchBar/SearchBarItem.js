import { TemplateController } from 'meteor/space:template-controller';
import { Meteor } from 'meteor/meteor';
import { rwindow } from 'meteor/gadicohen:reactive-window';
import { Session } from 'meteor/session';
import './SearchBarItem.html';

TemplateController('SearchBarItem', {
  events: {
    'click .search-item'() {
      if (rwindow.$width() < 992) {
        Router.go('memo.detail', {_id: this.data.memo._id});
      } else {
        Session.set('showModal', true);
        Session.set('MemoDetailId', this.data.memo._id);
        Session.set('showMemoDetail', true);
      }
      Session.set('isSearchNavShown', false);
      Session.set('searchQueryHeader', false);
      return false;
    }
  },

  helpers: {
    providerUrl() {
      let url = this.data.memo.provider_url;
      if (url) {
        let urlNoProtocol = url.replace(/^https?\:\/\//i, "");
        return urlNoProtocol;
      } else {
        return false;
      }
    }
  }
});
