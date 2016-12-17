import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import '../partials/Loading.js';
import '../partials/List/SingleList.js';
import '../partials/InfiniteScroll/loadingIndicator.js';
import '../layouts/component/PageTitle.js';

import './Archive.html';

const session = new ReactiveDict('Archive');

TemplateController('Archive', {
  state: {
    scrollTarget: '.main-container',
  },

  private: {
    INITIAL_RESULTS_LIMIT: 20,
  },

  onCreated() {
    this.session = session;
    this.session.setDefault('resultsLimit', this.INITIAL_RESULTS_LIMIT);
    this.session.setDefault('resultsCount', 0);

    const self = this;
    self.autorun(()=>{
      self.subscribe('memos');
      let query = {};
      query = {status: "expired", notifiedToUser: true};
      let counts  =  Memos.find(query).count();
      this.session.set('resultsCount', counts);
    });
    Session.set('Title', {name: "Archive"});
  },

  onRendered() {
    this.session.set('resultsLimit', this.INITIAL_RESULTS_LIMIT);
  },

  helpers: {
    notifyItems() {
      let notifiyItems = Memos.find({status: "expired", notifiedToUser: false}, {sort: {expiredAt: -1}});
      return notifiyItems;
    },
    archived() {
      let archivedItems =  Memos.find({status:"expired", notifiedToUser:true},{limit:this.session.get('resultsLimit'), sort:{expiredAt:-1}});
      return archivedItems;
    },
    notifyCount() {
      let notifiyCount = Memos.find({status: "expired", notifiedToUser: false}).count();
      if (notifiyCount === 0) {
        return false;
      } else {
        return true;
      }
    },
    archiveCount() {
      let archiveCount = this.session.get('resultsCount');
      if (archiveCount === 0) {
        return false;
      } else {
        return true;
      }
    },
    hasMoreContent() {
      return this.session.get('resultsLimit') < this.session.get('resultsCount');
    }
  },

  events: {
    'loadingIndicatorBecameVisible'() {
      const self = this;
      setTimeout(()=>{
        self.session.set('resultsLimit', session.get('resultsLimit') + 20);
      }, 500);
    },
  }
});
