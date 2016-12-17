import { TemplateController } from 'meteor/space:template-controller';
import { Meteor } from 'meteor/meteor';
import './Statistics.html';
TemplateController('Statistics', {

  state: {
    data: [],
  },

  onCreated() {
  },

  onRendered() {
    var chart = c3.generate({
        bindto: '#chart',
        data: this.state.data,
    });
  },

  helpers: {
    getData() {
      const self = this;
      Meteor.call('getClicksByDate', (err, result)=> {
        if (result) {
          self.state.data = result;
        }
      });
      console.log(self.state.data);
    },
  }
});

/*
{
  _id:{
    day: Number,
    memoId:String,
    month: Number,
    year: Number,
  },
  count: Number,
}
*/

/*
timeStamp = 
*/