import { TemplateController } from 'meteor/space:template-controller';
import '../../style.css';
import './HomeLayout.html';

//partials
import '../partials/Footer.html';
import '../partials/Header.html';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';

TemplateController('HomeLayout',{
	onCreated(){
		Session.set('Layout',false);
	},
});