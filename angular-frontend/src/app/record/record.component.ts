import { Component, OnInit } from '@angular/core';

// // import { XMLHttpRequest } from "xmlhttprequest";
// import { default as WebSocket } from 'ws';

// declare var global: any;
// // global.XMLHttpRequest = XMLHttpRequest;
// // global.WebSocket = WebSocket;

import {
  Kernel, Session, ServerConnection
} from '@jupyterlab/services';

// The base url of the notebook server.
const BASE_URL = 'http://localhost:8888';


import { TitleService } from '../title.service'

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  settings = ServerConnection.makeSettings({ 
    baseUrl: BASE_URL
  })

  options: Session.IOptions = {
    kernelName: 'python3',
    serverSettings: this.settings
  };

  session: Session.ISession;

  code = [
    'import matplotlib.pyplot as plt',
    '%matplotlib inline',
    'plt.plot([0,1], [0,1])'
  ].join('\n')

  // test: ServerConnection.ISettings = {
  //   baseUrl: BASE_URL
  // }

  constructor(
    private myTitleService: TitleService,
    // private myISettings: ServerConnection.ISettings
  ) { 

  }

  ngOnInit() {
    this.myTitleService.set('Record Results');

    // Kernel.listRunning(this.ISettings).then(kernelnModels => {
    //   console.log(kernelnModels)
    // }).catch(err => {
    //   console.error(err)
    // })

    // Kernel.getSpecs(this.ISettings).then(kernelSpecs => {
    //   console.log(kernelSpecs)
    //   return Kernel.startNew({
    //     baseUrl: BASE_URL,
    //     name: kernelSpecs.default
    //   })
    // })

    Kernel.startNew(this.options).then(kernel => {
      // console.log(kernel)
      let future = kernel.requestExecute({ code: this.code })
      // future.onReply = (reply) => {
      //   console.log('Got execute reply');
      // };
      // console.log(future)
      future.onIOPub = (msg) => {
        console.log(msg.content)
      }
    })

    // console.log('Starting session');
    // Session.startNew(this.options).then(s => {
    //   console.log('Session started');
    //   this.session = s;
    //   // Rename the session.
    //   return this.session.setPath('bar.ipynb');
    // }).then(() => {
    //   console.log(`Session renamed to ${this.session.path}`);
    //   // Execute and handle replies on the kernel.
    //   let future = this.session.kernel.requestExecute({ code: 'a = 1' });
    //   future.onReply = (reply) => {
    //     console.log('Got execute reply');
    //   };
    //   return future.done;
    // }).then(() => {
    //     console.log('Future is fulfilled');
    //     // Shut down the session.
    //     return this.session.shutdown();
    // }).then(() => {
    //     console.log('Session shut down');
    //     console.log('Test Complete!');
    // }).catch(err => {
    //   console.error(err);
    //   console.log('Test Failed! See the console output for details');
    // });
  }

}