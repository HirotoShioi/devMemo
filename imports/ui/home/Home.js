import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { i18n } from 'meteor/anti:i18n';
import { Label } from '../../api/label.js';
import '../partials/Loading.js';
import '../layouts/component/PageTitle.js';
import '../partials/Memo.js';

import './Home.html';

const session = new ReactiveDict('Home');

TemplateController('Home', {
  state: {
    recentCount: 0,
    favoriteCount: 0,
  },

  private: {
    initialResult: 8,
    incrementBy: 8,
  },
  onCreated() {
    this.session = session;
    this.session.setDefault('recentResultsLimit', this.initialResult);
    this.session.setDefault('favoriteResultsLimit', this.initialResult);
    Session.set('Title', {name: i18n('pageTitle.featured')});
    const self = this;
    self.autorun(()=>{
      self.subscribe('memos');
    });
    Meteor.call('getRecommend', (err, result)=>{
      if (err) {
        return;
      }
      if (!err) {
        self.state.recommendLabels = result;
        self.state.recommendCount = Memos.find({labelId: result._id}).count();
      }
    });
  },

  helpers: {
    favoriteMemos() {
      let query = {
        isFavorited: true,
      };
      this.state.favoriteCount = Memos.find(query).count();
      return Memos.find(query, {limit: this.session.get('favoriteResultsLimit'), sort: {createdAt: -1}});
    },
    recentMemos() {
      let query = {
        status: "active",
        isFavorited: false,
      };
      this.state.recentCount = Memos.find(query).count();
      return Memos.find(query, {limit: this.session.get('recentResultsLimit'), sort: {clickedAt: -1}});
    },
    recommendLabel() {
      if (this.state.recommendCount <= 0) {
        return false;
      }
      let label = Label.findOne({_id: this.state.recommendLabels._id});
      return label;
    },
    recommendMemos() {
      if (this.state.recommendCount <= 0) {
        return false;
      }
      let query = {
        status: "expired",
        isFavorited: false,
        labelId: this.state.recommendLabels._id
      };
      return Memos.find(query, {limit: 4, sort: {clicked: -1}});
    },
    recentHasMoreContent() {
      return this.session.get('recentResultsLimit') < this.state.recentCount;
    },
    favoriteHasMoreContent() {
      return this.session.get('favoriteResultsLimit') < this.state.favoriteCount;
    },
  },

  events: {
    'click .show-more-recent'() {
      this.session.set('recentResultsLimit', this.session.get('recentResultsLimit') + this.incrementBy);
    },
    'click .hide-recent'() {
      this.session.set('recentResultsLimit', this.initialResult);
    },
    'click .show-more-favorite'() {
      this.session.set('favoriteResultsLimit', this.session.get('favoriteResultsLimit') + this.incrementBy);
    },
    'click .hide-favorite'() {
      this.session.set('favoriteResultsLimit', this.initialResult);
    },
  },
});
