import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { Label } from '../../api/label.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import './LabelDetail.html';
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewOptions.js';
import '../partials/Loading.js';
import '../partials/InfiniteScroll/loadingIndicator.js';
import '../layouts/component/PageTitle.js';
import './ShareUserBar';
const session = new ReactiveDict('LabelDetail');
TemplateController('LabelDetail', {
  state: {
    scrollTarget: '.main-container',
  },

  private: {
    INITIAL_RESULTS_LIMIT: 40,
  },

  onCreated() {
    this.session = session;
    this.session.setDefault('resultsLimit', this.INITIAL_RESULTS_LIMIT);
    this.session.setDefault('resultsCount', 0);
    const self = this;
    self.autorun(()=>{
      let query = { labelId: self.data._id };
      if (Session.get('hideExpired')) {
        query.status = "active";
      }
      let counts  =  Memos.find(query).count();
      this.session.set('resultsCount', counts);
    });
  },

  onRendered() {
    this.session.set('resultsLimit', this.INITIAL_RESULTS_LIMIT);
  },

  helpers: {
    labelId() {
      return this.data._id;
    },
    owner() {
      const label = Label.findOne({_id: this.data._id});
      if (label) {
        return label.owner;
      } else {
        return false;
      }
    },
    memos() {
      Session.set('Title', Label.findOne({_id: this.data._id}, {fields: {'name': 1}}));
      let query = {
        labelId: this.data._id};
      if (Session.get('hideExpired')) {
        query.status = "active";
      }
      let memos = Memos.find(query, {limit: this.session.get('resultsLimit'), sort: {status: 1, clickedAt: -1}});
      return memos;
    },
    hasMoreContent() {
      return this.session.get('resultsLimit') < this.session.get('resultsCount');
    }
  },

  events: {
    'loadingIndicatorBecameVisible'() {
      const self = this;
      setTimeout(()=> {
        self.session.set('resultsLimit', session.get('resultsLimit') + 40);
      }, 500);
    },
  }
});
