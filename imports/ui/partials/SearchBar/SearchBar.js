import { TemplateController } from 'meteor/space:template-controller';
import { i18n } from 'meteor/anti:i18n';
import { Memos } from '../../../api/memos.js';

import './SearchBar.html';
import './SearchBarItem.js';

TemplateController('SearchBar', {
  state: {
    memoResultCount: 0,
    isSearching: false,
    memoSearchLimit: 7,
    labelTitle: i18n('search.frequentlyUsed'),
  },

  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('memos');
    });
  },
  helpers: {
    searchedMemos() {
      let search = Session.get('searchQuery');
      let regex = new RegExp(search, 'i');
      // need research on description ( full text search)
      if (search) {
        this.state.isSearching = true;
        this.state.labelTitle = i18n('search.searchResult');
        this.state.memoResultCount = Memos.find({$or: [{name: regex}, {provider_url: regex}]}, {limit: this.state.memoSearchLimit, sort: {clicked: 1}}).count();
        return Memos.find({$or: [{name: regex}, {provider_url: regex}]}, {limit: this.state.memoSearchLimit, sort: {clicked: 1}}).fetch();
      } else {
        this.state.labelTitle = i18n('search.frequentlyUsed');
        let projection = {limit: this.state.memoSearchLimit, sort: {clicked: 1}};
        return Memos.find({}, projection);
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
