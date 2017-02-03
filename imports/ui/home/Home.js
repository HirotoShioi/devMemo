import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { userFavorites } from '../../api/userFavorites.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { i18n } from 'meteor/anti:i18n';
import { Label } from '../../api/label.js';
import '../partials/Loading.js';
import '../partials/Memo.js';
import '../partials/emptyMemo.js';

import './Home.html';

const session = new ReactiveDict('Home');

TemplateController('Home', {
  state: {
    recentCount: 0,
    favoriteCount: 0,
    recommendCount: 0,
    favoriteList: [],
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
    Meteor.call('getRecommend', (err, result)=>{
      if (err) {
        return;
      }
      if (result) {
        self.state.recommendLabels = result;
        const recommendQuery = {
          owner: Meteor.userId(),
          labelId: result._id,
          status: "expired",
        };
        self.state.recommendCount = Memos.find(recommendQuery).count();
      }
    });
    self.autorun(()=>{
      let favorites = userFavorites.find({}, {sort: {favoritedAt: -1}}).fetch();
      this.state.favoriteList = [];
      favorites.forEach((favorite)=>{
        this.state.favoriteList.push(favorite.memoId);
      });
      self.subscribe('memos');
    });
  },

  helpers: {
    favoriteMemos() {
      this.state.favoriteCount = userFavorites.find().count();
      return userFavorites.find({userId: Meteor.userId()}, {sort: {favoritedAt: -1}});
    },
    recentMemos() {
      let query = {
        owner: Meteor.userId(),
        status: "active",
        _id: {$nin: this.state.favoriteList}
      };
      this.state.recentCount = Memos.find(query).count();
      return Memos.find(query, {limit: this.session.get('recentResultsLimit'), sort: {clickedAt: -1}});
    },
    noRecentMemos() {
      const emptyMemoCount = 4;
      emptyMemoAry = [];
      for (i = 0; i < emptyMemoCount; i++) {
        emptyMemoAry.push({});
      }
      return emptyMemoAry;
    },
    recommendLabel() {
      if (!this.state.recommendLabels) {
        return false;
      }
      let label = Label.findOne({_id: this.state.recommendLabels._id});
      return label;
    },
    recommendMemos() {
      let query = {
        owner: Meteor.userId(),
        status: "expired",
        _id: {$nin: this.state.favoriteList},
      };
      if (this.state.recommendLabels) {
        query.labelId = this.state.recommendLabels._id;
      }
      const favoriteMemos =  Memos.find(query, {limit: 4, sort: {clicked: 1}});
      console.log(favoriteMemos.fetch());
      return favoriteMemos;
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
