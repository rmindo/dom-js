// Styles
import styles from '../assets/styles/Dashboard';



class Dashboard {

	constructor() {
		this.head.css(styles);
		this.head.title('Dashboard');
	}



	button($) {
		$.set({test: false, show: false});

		$.att({
			id: 'submit',
			class: 'button'
		});
		
		$.css({
			border: '0',
		    color: '#fff',
		    padding: '10px',
		    background: '#1458f1'
		});

		$.on('click', (e) => {
			$.innerHTML = 'Javascript is Awesome!';
			$.set({show: false, test: true});
		});

		$.on('mouseenter', (e) => {
			$.set({show: true, test: false});
		});


		$.put('Show Image');
	}



	content($) {

		return {
			img: ($) => {
				$.css({display: 'none'});
				if($.get('show')) {
					$.setAttribute('src', 'favicon.ico');
				}
				if($.get("test")) {
					$.setAttribute('src', 'assets/images/logo.png');
				}
			},
			h1: 'Dashboard',
			p: [
				'Dashboards often provide at-a-glance views of key performance indicators (KPIs) relevant to a particular objective or business process. In the other, "dashboard" has another name for "progress report" or "report."',
				'The "dashboard" is often displayed on a web page which is linked to a database that allows the report to be constantly updated. For example, a manufacturing dashboard may show numbers related to productivity such as number of parts manufactured, or number of failed quality inspections per hour.',
				'Similarly, a human resources dashboard may show numbers related to staff recruitment, retention and composition, for example number of open positions, or average days or cost per recruitment.',
				'The term dashboard originates from the automobile dashboard where drivers monitor the major functions at a glance via the instrument cluster.'
			],
			button: this.button,
		};
	}
}


export default Dashboard;