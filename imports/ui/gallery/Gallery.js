import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { i18n } from 'meteor/anti:i18n';
import { rwindow } from 'meteor/gadicohen:reactive-window';
import './Gallery.html';

// partials
import '../partials/InfiniteScroll/loadingIndicator.js';
import '../partials/Loading.js';
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewOptions.js';
import '../partials/emptyMemo.js';

const session = new ReactiveDict('Gallery');

TemplateController('Gallery', {
  state: {
    scrollTarget: '.main-container',
    memoCount: 0,
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
      let query = {owner: Meteor.userId()};
      if (Session.get('hideExpired')) { query.status = "active";}
      let counts  =  Memos.find(query).count();
      this.session.set('resultsCount', counts);
      self.subscribe('memos');
    });
    Session.set("Title", {name: i18n('pageTitle.memos')});
  },

  onRendered() {
    this.session.set('resultsLimit', this.INITIAL_RESULTS_LIMIT);
  },

  helpers: {
    memos() {
      let query = {owner: Meteor.userId()};
      if (Session.get('hideExpired')) { query.status = "active"; }
      const sortFilter = Session.get('gallerySortFilter');
      let sort = {};
      switch (sortFilter) {
        case "newest":
          sort = {createdAt: -1};
          break;
        case "mostClicked":
          sort = {clicked: -1};
          break;
        case "byLabels":
          sort = {labelId: 1};
          break;
        default:
          sort = {createdAt: -1};
      }
      return Memos.find(query, {limit: this.session.get('resultsLimit'), sort: sort});
    },
    emptyMemos() {
      const emptyMemoCount = (rwindow.$width() >= 1650 ) ? 10 : 8;
      emptyMemoAry = [];
      for (i = 0; i < emptyMemoCount; i++) {
        emptyMemoAry.push({});
      }
      return emptyMemoAry;
    },
    hasMoreContent() {
      return this.session.get('resultsLimit') < this.session.get('resultsCount');
    },
  },

  events: {
    'loadingIndicatorBecameVisible'() {
      const self = this;
      setTimeout(()=>{
        self.session.set('resultsLimit', session.get('resultsLimit') + 40);
      }, 500);
    },
  }
});
