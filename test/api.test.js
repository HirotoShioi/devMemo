import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';

const User = Factory.define('user', Meteor.users, {});
describe('Memo', function() {
  beforeEach(function() {
    resetDatabase();
  });

  it('Will add memo with embed informations', function() {
    this.user = Factory.create('user');
    const memoObj = {
      url: "https://www.youtube.com/"
    };
    Meteor.call("addMemo", memoObj, (err)=> {
      if (err) {
        console.log(err);
      }
      if (!err) {
        console.log(err);
      }
    });
  });
});
