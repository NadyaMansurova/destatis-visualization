/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

//import { GoogleCharts } from 'google-charts';

class MyView1 extends PolymerElement {
  constructor() {
    super();
  }
  ready() {
    super.ready();
    // data for visualization
    this.data = {};

    fetch('./backend/data.json')
        .then(response => {
          if (response.status !== 200) {
            console.log('Something goes wrong...');
          }
          response.json().then(res => {
            this.data = res;
            this.initTable();
          });
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
  }
  initTable() {
    console.log(this.data);
    //let table = new GoogleCharts.visualization.DataTable();
  }
  static get properties() {
    return {
      data: Object
    };
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>{{data.header}}</h1>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
      </div>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
