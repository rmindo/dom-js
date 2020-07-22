var app;


/**
* Base Controller
*/
class App {


  constructor() {
    app = this;

    this.head.link('/assets/css/reset.css', 'reset');
    this.head.link('/assets/css/global.css', 'global');
  }



  fetch(data) {

    return fetch(`http://localhost:100/app/v1/services`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': process.env.API_ACCESS_TOKEN
      }
    }).then((r) => r.json());
  }



  panel($) {
    return {
      ul: {
        li: [
          {
             a: ($) => $.route('/#/', 'Dashboard')
          },
          {
             a: ($) => $.route('/#/users', 'Users')
          },
          {
             a: ($) => $.route('/#/campaigns', 'Campaigns')
          },
          {
             a: ($) => $.route('/#/segments', 'Segments')
          },
          {
            a: ($) => $.route('/#/automations', 'Automations')
          },
          {
            a: ($) => $.route('/#/forms', 'Forms')
          },
          {
            a: ($) => $.route('/#/analytics', 'Analytics')
          },
          {
            a: ($) => $.route('/#/reports', 'Reports')
          }
        ]
      }
    };
  }


  container() {

    return [
      {
        div: this.dump('panel')
      },
      {
        div: this.dump('content')
      }
    ];
  }
}


export default App;
