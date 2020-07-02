class Automations {

	constructor() {
		this.head.title('Automations');
	}


	button(node) {
		node.id = 'button';
		node.innerHTML = 'Click to see the world!';
	}


	content() {
		return {
			h1: 'Automations',
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
				'Most of the features within webpack itself use this plugin interface.',
				'This makes webpack flexible.',
			],
			button: this.button
		};
	}
}


export default Automations;