import { TemplateController } from 'meteor/space:template-controller';
import '../../style.css';
import './MainLayout.html';

//partials
import '../partials/Footer.html';
import '../partials/Header.js';
import '../partials/SideNav.js';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';

TemplateController('MainLayout',{
	onCreated(){
		Session.set('Layout',true);
	}
});