import { Template } from 'meteor/templating';

import '../../style.css';
import './HomeLayout.html';

//partials
import '../partials/Footer.html';
import '../partials/Header.html';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';
Template.HomeLayout.onCreated(function(){
	Session.set('Layout',false);
});