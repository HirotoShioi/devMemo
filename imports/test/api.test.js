import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Memos } from '../api/memos.js';
import { stubLoggedInUser, restoreStubbedLoggedInUser } from '../api/helpers';
import { expect } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';

Factory.define('user', Meteor.users, {});
Factory.define('memos', Memos, {});

describe('Memo', function() {
  beforeEach(function() {
    resetDatabase();
    this.user = Factory.create('user', {'profile.username': "hiroto", 'profile.ExpiredIn': 3});
  });

  it('Will add memo with embed informations', function(done) {
    stubLoggedInUser.call(this, this.user);
    const memoObj = {
      url: "https://www.youtube.com/"
    };
    Meteor.call("addMemo", memoObj, (err, result)=> {
      restoreStubbedLoggedInUser.call(this);
      if (!err) {
        expect(result.statusCode).to.be(200);
        expect(result.provider_url).to.be("www.youtube.com");
      }
      done();
    });// meteor call
  });// it

  it('Can toggle favorite status', function(done) {
    stubLoggedInUser.call(this, this.user);
    StubCollections.stub(Memos);
    const memos = Factory.create('memos', {url: "http://www.youtube.com", isFavorited: false});
    Meteor.call('updateFavorite', memos, (error)=>{
      try {
        expect(error).to.be.undefined;
        restoreStubbedLoggedInUser.call(this);
        StubCollections.restore();
        const memo = Memos.findOne({owner: this.user._id});
        expect(memo.isFavorited).to.be.true;
      } catch (exeption) {
        done();
      }
    });
  });
});
