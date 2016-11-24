import { TemplateController } from 'meteor/space:template-controller';
import '../../style.css';
import './MainLayout.html';
import { rwindow } from 'meteor/gadicohen:reactive-window';
//partials
import '../partials/Header.js';
import '../partials/SideNav.js';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';
import '../partials/SearchBar/SearchBar.js';

TemplateController('MainLayout',{
	onCreated(){
		Session.set('shouldHeaderBeShownAtFullWindow',true);
	},

	helpers:{
		shouldSearchBarShow(){
			if(rwindow.outerWidth() <= 992){
				Session.set('isSearching',false);
				return false;
			}else{
				return true;
			}
		},
	}
});