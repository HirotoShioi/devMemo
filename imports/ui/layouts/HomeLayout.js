import { TemplateController } from 'meteor/space:template-controller';
import '../../stylesheets/style.less';
import './HomeLayout.html';

//partials
import '../partials/Footer.html';
import '../partials/Header.html';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';

TemplateController('HomeLayout',{
	onCreated(){
		Session.set('shouldHeaderBeShownAtFullWindow',false);
	},
});