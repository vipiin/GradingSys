
import React from "react";
import { Chart } from "chart.js";
export default function Mainblock() {
  function createTable() {
    const tbody = document.querySelector('tbody');
    if (tbody) {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
    const data = require('./data.json')
    // fetch('data.json')
    //   .then(response => response.json())
    //   .then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.textContent = data[i].id;
      const td2 = document.createElement('td');
      td2.textContent = data[i].name;
      const td3 = document.createElement('td');
      td3.textContent = data[i].ticket_number;
      const td9 = document.createElement('td');
      td9.textContent = data[i].ticket_topic;
      const td4 = document.createElement('td');
      td4.textContent = data[i].rating_grade;
      const td5 = document.createElement('td');
      td5.textContent = data[i].exam_grade;
      let final = 0.6 * data[i].exam_grade + 0.4 * data[i].rating_grade
      const td6 = document.createElement('td');
      td6.textContent = final.toFixed(2);
      const td7 = document.createElement('td');
      td7.textContent = (() => {
        if (final > 4) {

          return "Passed";
        }
        else {
          return "Failed";
        }
      })();
      const td8 = document.createElement('td');
      const detailsBtn = document.createElement('button');
      detailsBtn.textContent = 'Details';
      detailsBtn.addEventListener('click', () => {
        if (tr.classList.contains('selected')) {
          tr.classList.remove('selected');
        }
        const popup = document.querySelector('#popup');
        const popupTitle = document.querySelector('#popup-title');
        const popupText = document.querySelector('#popup-text');
        popupTitle.textContent = data[i].name;
        // popupText.textContent = data[i].comments;
        popupText.innerHTML = '<span style="font-size: large; color: red;">ID: </span>' + '<em>' + data[i].id + '</em>' + "<br>" +
          '<span style="font-size: large; color: red;">Name: </span>' + '<em>' + data[i].name + '</em>' + "<br>" +
          '<span style="font-size: large; color: red;">Ticket Number: </span>' + '<em>' + data[i].ticket_number + '</em>' + "<br>" +
          '<span style="font-size: large; color: red;">Ticket Topic: </span>' + '<em>' + data[i].ticket_topic + '</em>' + "<br>" +
          '<span style="font-size: large; color: red;">Exam Grade: </span>' + '<em>' + data[i].exam_grade + '</em>' + "<br>" +
          '<span style="font-size: large; color: red;">Rating Grade: </span>' + '<em>' + data[i].rating_grade + '</em>' + "<br>" +
          '<span style="font-size: large; color: red;">Comments: </span>' + '<em>' + data[i].comments + '</em>';

        popup.style.display = 'flex';
      });
      td8.appendChild(detailsBtn);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td9);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      if (tbody) {
        tbody.appendChild(tr);
      }
    }
    // });  

    console.log(window.chart);
    const closeBtn = document.querySelector('.close-btn');
    const popup = document.querySelector('#popup');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }
  }
  const style = {
    color: 'black',
    fontSize: 'x-large',
    fontWeight: 'bolder',
  }
  const style2 = {
    marginTop: '120px',
  }
  const style3 = {
    verticalAlign: 'top',
    display: 'inline-block',

  }
  // createTable();
  return (
    <>
      <div id="overflow">
        <table id="myTable" >
          <thead>
            <tr>
              <th>No</th>
              <th id="name-header">Name &#8595;</th>
              <th>Ticket's Number</th>
              <th>Ticket's Topic</th>
              <th>Rating Grade</th>
              <th>Exam Grade</th>
              <th id="final-grade">Final Grade &#8595;</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody ref={createTable}>
          </tbody>
        </table>
        <button id="stats">Statistics</button>
        <button id="hidestats">Hide</button>

        <div id="statistics" className="hidden">
          <div class="students-info">
            Total students: <span id="total-students">0</span>
          </div>

          <canvas id="myChart" width="600" height="400" style={style3}></canvas>
          <canvas id="pie" width="500" height="400" style={style3}></canvas>

          <div id="statscontent">
            <canvas id="line" width="800" height="400" style={style3}></canvas>

            <ul></ul>
          </div>
        </div>
        <div id="popup" class="popup">
          <div class="popup-content">
            <span class="close-btn" style={style}>&times;</span>
            <h1 id="popup-title" style={style2}> </h1>
            <p id="popup-text"></p>
          </div>
        </div>
      </div>
    </>
  )
}    