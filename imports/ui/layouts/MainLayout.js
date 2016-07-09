import { Template } from 'meteor/templating';

import '../../style.css';
import './MainLayout.html';

//partials
import '../partials/Footer.html';
import '../partials/Header.js';
import '../partials/SideNav.js';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';
Template.MainLayout.onCreated(function(){
	Session.set('Layout',true);
});

Template.MainLayout.helpers({

});