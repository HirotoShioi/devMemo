import './SearchNavBar.html';
import './SearchBarItem.js';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('SearchNavBar', {
  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('memos');// for search query!
    });
  },
  helpers: {
    searchedMemos() {
      let search = Session.get('searchQuery');
      let regex = new RegExp(search, 'i');
      // need research on description ( full text search)
      if (search) {
        return Memos.find({$or: [{name: regex}, {provider_url: regex}]}).fetch();
      } else {
        return false;
      }
    },
  },
  events: {
    'keyup [name="search"]'(event) {
      let value = event.target.value.trim();
      Session.set('searchQuery', value);
    },
    'click .fa-arrow-left'() {
      Session.set('isSearchNavShown', false);
      Session.set('searchQuery', '');
      return false;
    },
  },
});
