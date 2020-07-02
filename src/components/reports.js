class Reports {

	constructor() {

		this.head.title('Reports');
	}


	button(node) {

		node.id = 'button';

		node.innerHTML = 'Click to see the world!';
	}



	content() {

		return {
			h1: 'Reports',
			p: [
				{
					strong: 'webpack has a rich plugin interface.',
					span: 'Test',
					em: {
						small: 'small',
						span: {
							strike: 'strike',
							small: [
								'one',
								'two',
								'three',
								{
									span: 'four'
								}
							]
						}
					}
				},
				'Most of the features within webpack itself use this plugin interface.'
			],
			button: this.button
		};
	}
}


export default Reports;