import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import { labelShare } from '../../api/labelShare.js';
import { Session } from 'meteor/session';

import './Labels.html';

import '../partials/LabelBar/labelBarItem.js';
import '../partials/Loading.js';

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

TemplateController('Labels', {
  state: {
    labelResultCount: 0,
    labelCount: 0,
  },

  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('label');
      let availableLabel = queryAvailableLabels(Meteor.userId());
      self.state.labelCount = Label.find({$or: availableLabel}).count();
    });
    Session.set('Title', {name: "Labels"});
  },

  helpers: {
    labels() {
      let availableLabels = queryAvailableLabels(Meteor.userId());
      let projection = {sort: {name_sort: 1, name: 1}};
      this.state.labelResultCount = Label.find({$or: availableLabels}, projection).count();
      return Label.find({$or: availableLabels}, projection);
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
  },
  events: {
  }
});
