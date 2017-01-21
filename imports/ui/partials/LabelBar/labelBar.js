import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js';
import { labelShare } from '../../../api/labelShare.js';
import { Session } from 'meteor/session';

import './labelBar.html';
import './labelBarItem.js';

const queryAvailableLabels = ((userId)=>{
  let availableArray = [{owner: userId}];
  const sharedLabels = labelShare.find({sharedTo: Meteor.userId()});
  sharedLabels.forEach((label)=>{
    if (label.status === "accepted") {
      availableArray.push({_id: label.labelId});
    }
  });
  return availableArray;
});

TemplateController('labelBar', {
  state: {
    labelSearchQuery: "",
    isSearching: false,
    labelResultCount: 0,
    labelSearchLimit: 20,
    labelCount: 0,
  },

  onCreated() {
    const self = this;
    self.autorun(()=>{
      let availableLabel = queryAvailableLabels(Meteor.userId());
      this.state.labelCount = Label.find({$or: availableLabel}).count();
    });
  },

  helpers: {
    searchedLabels() {
      let search = this.state.labelSearchQuery;
      let regex = new RegExp(search, 'i');
      let availableLabels = queryAvailableLabels(Meteor.userId());
      if (search !== "") {
        this.state.isSearching = true;
        let searchQuery = [{name: regex}];
        return Label.find({$and: [{$or: availableLabels}, {$or: searchQuery}]}, {sort: {name_sort: 1, name: 1}}).fetch();
      } else {
        this.state.isSearching = false;
        let projection = {limit: this.state.labelSearchLimit, sort: {name_sort: 1, name: 1}};
        this.state.labelResultCount = Label.find({$or: availableLabels}, projection).count();
        return Label.find({$or: availableLabels}, projection);
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
      if (this.state.labelCount === 0) {
        return true;
      } else {
        return false;
      }
    },
    noResult() {
      if (this.state.labelResultCount === 0 && this.state.isSearching) {
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
