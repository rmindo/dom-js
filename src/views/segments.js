// Styles
// import styles from './Styles/Users';



class Segments {

	constructor() {
		this.head.title('Segments');
	}


	button(node) {
		node.id = 'button';
		node.innerHTML = 'Click to see the world!';
	}



	content($) {
		$.setAttribute('id', 'content');

		return {
			h1: 'Segments',
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
									span: {
										strong: 'four'
									}
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


export default Segments;