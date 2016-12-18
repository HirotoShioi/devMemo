import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { i18n } from 'meteor/anti:i18n';
import './Memos.html';

// partials
import '../partials/InfiniteScroll/loadingIndicator.js';
import '../partials/Loading.js';
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewOptions.js';
import '../layouts/component/PageTitle.js';
const session = new ReactiveDict('Memos');

TemplateController('Memos', {
  state: {
    scrollTarget: '.main-container',
    memoCount: 0,
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
      if (Session.get('hideExpired')) { query.status = "active";}
      let counts  =  Memos.find(query).count();
      this.session.set('resultsCount', counts);
    });
    Session.set("Title", {name: i18n('pageTitle.memos')});
  },

  onRendered() {
    this.session.set('resultsLimit', this.INITIAL_RESULTS_LIMIT);
  },

  helpers: {
    memos() {
      let query = {};
      if (Session.get('hideExpired')) { query.status = "active"; }
      return Memos.find(query, {limit: this.session.get('resultsLimit'), sort: {status: 1, createdAt: -1}});
    },
    hasMoreContent() {
      return this.session.get('resultsLimit') < this.session.get('resultsCount');
    },
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
