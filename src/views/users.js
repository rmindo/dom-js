// Styles
import styles from '../assets/styles/Users';



// class Users extends Layout {
class Users {

	constructor(app) {
		this.app = app;

		this.head.title('Users');
		this.head.css(styles);
		this.head.script('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
	}



	records() {
		const data = {
      fn: 'f07',
      data: {
        user: {
          ui: 2,
          dn: 1
        },
        load: {
          limit: 5
        }
      }
    };
		return this.app.fetch(data);
	}



	content($) {

		return {
			h1: ($) => {
				if($.get('test')) {
					
					// $.put(' List');
					$.put({
						i: 'List of Users'
					});

					// $.put('List of Contact');
					
					// $.append(' List');

					// $.append({
					// 	i: ' List'
					// });


					// $.prepend('List of ');

					// $.prepend({
					// 	i: 'List of '
					// });

					// return 'List of Users';

					// return {
					// 	i: 'List of Users'
					// };

					// return {
					// 	span: ($) => {
					// 		return {
					// 			i: 'List of Users'
					// 		};
					// 	}
					// }
				} else {

					$.put({
						i: 'Users'
					});
				}
			},
			table: async ($, o = []) => {

				const r = await this.records();

				$.att({
					id: 'list',
					class: 'records'
				});

        for(let i in r.result) {
          let item = r.result[i];

          if(item.hasOwnProperty('email')) {
            o.push({
              td: [
                item['email'],
                item['query'],
                item['type'],
                item['locality']['location'],
                item['locality']['country']
              ]
            });
          }
        }

        return {
					thead: ($) => {

						$.att({
							id: 'thead'
						});

						return {
							tr: {
								th: [
									'Email',
									'Query',
									'Schedule',
									'City',
									'Country'
								]
							}
						}
					},
					tbody: {tr: o}
				};
			},
			button: ($) => {

				$.on('click', (e) => {
		      $.set({test: true});
				});
				return 'View More';
			}
		};
	}
}


export default Users;