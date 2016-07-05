import './Home.html';
import {Template} from 'meteor/templating';

Template.Home.onCreated(function(){
	Session.set('Title',{name:"Welcome"});
});