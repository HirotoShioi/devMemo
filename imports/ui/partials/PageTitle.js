import './PageTitle.html';
import { Template } from 'meteor/templating';

Template.PageTitle.helpers({
	title:()=>{
		return Session.get('Title');
	}
})