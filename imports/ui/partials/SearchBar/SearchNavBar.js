import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import './SearchNavBar.html';
import './SearchBarItem.js';

TemplateController('SearchNavBar', {
  helpers: {
    searchedMemos() {
      let search = Session.get('searchQueryHeader');
      let regex = new RegExp(search, 'i');
      // need research on description ( full text search)
      if (search) {
        return Memos.find({$or: [{name: regex}, {provider_url: regex}]}, {limit: 4}).fetch();
      } else {
        return false;
      }
    },
  },
  events: {
    'keyup [name="search-header"]'(event) {
      let value = event.target.value.trim();
      Session.set('searchQueryHeader', value);
    },
    'click .fa-arrow-left'() {
      Session.set('isSearchNavShown', false);
      Session.set('searchQueryHeader', '');
      return false;
    },
  },
});
