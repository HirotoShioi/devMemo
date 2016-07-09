import { Template } from 'meteor/templating';

import './Overlay.html';

Template.Overlay.events({
	'click .overlay-show'(){
		Session.set('sideNav',false);
	}
});