class Campaigns {

	constructor(app) {

		this.app = app;

		this.head.title('Campaigns');
		this.head.css({
			'#action': {
				'padding': '20px',
				'margin': '0 0 20px',
				'border': '1px solid #ddd'
			},
			'#editor': {
				float: 'left'
			},
			'#preview': {
				'float': 'left',
				'width': '100%',
				'padding': '20px',
    			'max-width': '900px',
    			'min-height': '700px',
				'margin': '0 20px 20px 0',
				'border': '1px solid #ddd'
			}
		});
	}



	send() {
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
			h1: 'Campaigns',
			div: [
				($) => {
					$.att({id: 'template'});

					return [
						($) => {
							$.att({id: 'action'});

							$.put({
								button: async ($) => {

									$.att({id: 'send'});

									$.on('click', async (e) => {
										var result = await this.send();

										console.log(result);
									});

									$.put('Send Campaign');
								}
							});
						},
						($) => {
							$.att({id: 'preview'});
						}
					]
				},
				($) => {
					$.att({id: 'editor'});

					return {
						textarea: ($) => {

							$.on('keyup', (e) => {
								$.pick('preview').put(e.target.value);
							});

							$.value = '<div style="width:100%;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ddd">'+
                '<h2 style="margin: 0 0 20px;">7 new Full Stack Developer jobs in Remote</h2>'+
                '<div>'+
                '<h4 style="margin:0 0 10px;line-height: 10px;">Software Test Engineer</h4>'+
                '<p style="margin:0 0 10px;line-height: 10px;"><small>Jumpcut</small></p>'+
                '<p style="margin:0 0 10px;line-height: 10px;">2 year’s experience as a Test Engineer doing full-time automation.</p></div></div>'

							$.pick('preview').put($.value);
						}
					}
				}
			]
		};
	}
}


export default Campaigns;