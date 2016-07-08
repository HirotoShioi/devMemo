import './Header.html';

import { Template } from 'meteor/templating';

Template.Header.helpers({
	title:()=>{
		return Session.get('Title');
	}
})