import { Template } from 'meteor/templating';

import '../../style.css';
import './MainLayout.html';

//partials
import '../partials/Footer.html';
import '../partials/Header.html';
import '../partials/NotLoggedIn.html';
import '../partials/SideNav.js';
import '../partials/PageTitle.js';

Template.MainLayout.helpers({
	currentUser:()=>{
		return Meteor.user();
	}
});