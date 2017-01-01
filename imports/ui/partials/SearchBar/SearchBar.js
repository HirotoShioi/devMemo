import { TemplateController } from 'meteor/space:template-controller';
import { i18n } from 'meteor/anti:i18n';
import { Memos } from '../../../api/memos.js';
import { labelShare } from '../../../api/labelShare.js';

import './SearchBar.html';
import './SearchBarItem.js';

const queryAvailableMemos = ((userId)=>{
  let availableArray = [{owner: userId}];
  const sharedLabels = labelShare.find({sharedTo: Meteor.userId()});
  sharedLabels.forEach((label)=>{
    if (label.status === "accepted") {
      availableArray.push({labelId: label.labelId});
    }
  });
  return availableArray;
});
TemplateController('SearchBar', {
  state: {
    memoResultCount: 0,
    memoCount: 0,
    isSearching: false,
    memoSearchLimit: 7,
    labelTitle: i18n('search.frequentlyUsed'),
  },

  onCreated() {
    const self = this;
    self.autorun(()=>{
      const availableMemo = queryAvailableMemos(Meteor.userId());
      this.state.memoCount = Memos.find({$or: availableMemo}).count();
    });
  },
  helpers: {
    searchedMemos() {
      let search = Session.get('searchQuery');
      let regex = new RegExp(search, 'i');
      const availableMemo = queryAvailableMemos(Meteor.userId());
      if (search) {
        this.state.isSearching = true;
        this.state.labelTitle = i18n('search.searchResult');
        let searchArray = [];
        searchArray.push({name: regex});
        searchArray.push({provider_url: regex});
        this.state.memoResultCount = Memos.find({$and: [{$or: availableMemo}, {$or: searchArray}]}, {limit: this.state.memoSearchLimit}).count();
        return Memos.find({$and: [{$or: availableMemo}, {$or: searchArray}]}, {limit: this.state.memoSearchLimit, sort: {clicked: 1}}).fetch();
      } else {
        this.state.isSearching = false;
        this.state.memoResultCount = 0;
        this.state.labelTitle = i18n('search.frequentlyUsed');
        let projection = {limit: this.state.memoSearchLimit, sort: {clicked: 1}};
        return Memos.find({$or: availableMemo}, projection);
      }
    },
    shouldSearchBarShow() {
      return Session.get('isSearching');
    },
    noResult() {
      if (this.state.memoResultCount === 0 && this.state.isSearching) {
        return true;
      } else {
        return false;
      }
    },
    noMemos() {
      if (this.state.memoCount === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  events: {
    'keyup [name="memoSearch"]'(event) {
      let value = event.target.value.trim();
      Session.set('searchQuery', value);
    },
    'click .toggle-memo-show'() {
      if (this.state.memoSearchLimit < 30) {
        this.state.memoSearchLimit += 10;
      }
      return false;
    }
  }
});
