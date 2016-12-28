import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js';
import { Session } from 'meteor/session';

import './labelBar.html';
import './labelBarItem.js';

TemplateController('labelBar', {
  state: {
    labelSearchQuery: "",
    isSearching: false,
    labelResultCount: 0,
    labelSearchLimit: 20,
  },

  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('label');
    });
  },

  helpers: {
    searchedLabels() {
      let search = this.state.labelSearchQuery;
      let regex = new RegExp(search, 'i');
      if (search !== "") {
        this.state.isSearching = true;
        return Label.find({name: regex}, {sort: {name_sort: 1, name: 1}}).fetch();
      } else {
        this.state.isSearching = false;
        let projection = {limit: this.state.labelSearchLimit, sort: {name_sort: 1, name: 1}};
        this.state.labelResultCount = Label.find({}, projection).count();
        return Label.find({}, projection);
      }
    },
    shouldSearchBarShow() {
      return Session.get('labelBarShow');
    },
    labelResultCount() {
      let search = this.state.labelSearchQuery;
      let regex = new RegExp(search, 'i');
      if (search) {
        this.state.labelResultCount =  Label.find({name: regex}).count();
        return this.state.labelResultCount;
      } else {
        return false;
      }
    },
    noLabel() {
      const labelCount = Label.find({}).count();
      console.log(labelCount);
      if (labelCount === 0) {
        return true;
      } else {
        return false;
      }
    },
    noResult() {
      if (this.state.labelResultCount === 0 && this.state.isSearching){
        return true;
      } else {
        return false;
      }
    },
  },
  events: {
    'keyup [name="labelSearch"]'(event) {
      let value = event.target.value.trim();
      this.state.labelSearchQuery = value;
    },
    'click .toggle-label-show'() {
      if (this.state.labelSearchLimit < 20) {
        this.state.labelSearchLimit += 3;
      }
      return false;
    },
    'click .fa-plus-circle'() {
      Session.set('showModal', true);
      Session.set('formType', 'AddLabel');
    },
  }
});
