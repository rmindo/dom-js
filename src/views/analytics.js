class Analytics {

  constructor() {
    this.head.title('Analytics');
  }


  button(node) {
    node.id = 'button';
    node.innerHTML = 'Click to see the world!';
  }


  content() {
    return {
      h1: 'Analytics',
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
        }
      ],
      button: this.button
    };
  }
}


export default Analytics;
