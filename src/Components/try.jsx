import React from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Chart, registerables } from "chart.js";
import { useState } from "react";
export default function Try() {
    function Tryr() {
        Chart.register(...registerables);
        const updatestat = () => {

            const canvas = document.getElementById("myChart");
            let ctx;
            let chartStatus = Chart.getChart("myChart"); // <canvas> id
            if (chartStatus !== undefined) {
                chartStatus.destroy();
            }
            if (canvas) {
                ctx = canvas.getContext("2d");
            }
            const chartsByCanvasId = {};
            const destroyChartIfNecessary = (canvasId) => {
                if (chartsByCanvasId[canvasId]) {
                    chartsByCanvasId[canvasId].destroy();
                }
            }
            const registerNewChart = (canvasId, chart) => {
                chartsByCanvasId[canvasId] = chart;
            }
            const table = document.getElementById("myTable");
            let rows2;
            if (table) {
                rows2 = table.getElementsByTagName("tr");
            }
            let totalStudents = 0
            let passedCount = 0;
            let failedCount = 0;
            let totalMarks = 0;
            let maxMarks = Number.MIN_VALUE;
            let minMarks = Number.MAX_VALUE;
            if (rows2) {
                for (let i = 1; i < rows2.length; i++) {
                    const statusCell = rows2[i].getElementsByTagName("td")[7];
                    const status = statusCell.textContent;
                    if (status === "Passed" && !rows2[i].classList.contains('hidden')) {
                        passedCount++;
                    } else if (status === "Failed" && !rows2[i].classList.contains('hidden')) {
                        failedCount++;
                    }
                    const finalGradeCell = rows2[i].getElementsByTagName("td")[6];
                    const finalGrade = Number(finalGradeCell.textContent);
                    if (!rows2[i].classList.contains('hidden')) {
                        totalStudents += 1
                        totalMarks += finalGrade;
                        maxMarks = Math.max(maxMarks, finalGrade);
                        minMarks = Math.min(minMarks, finalGrade);
                    }
  
                } 
                const totalStudentsDiv = document.getElementById("total-students");
                totalStudentsDiv.textContent = totalStudents;
                const averageMarks = (totalMarks / (rows2.length - 1)).toPrecision(2);
                const formatter = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                });
                const statsUl = document.querySelector("#statscontent ul");
                statsUl.textContent = ""
                const data = [passedCount, failedCount, averageMarks, maxMarks, minMarks];

                const labels = ["Passed", "Failed", "Average Marks", "Max Marks", "Min Marks"];

                for (let i = 0; i < data.length; i++) {
                    const listItem = document.createElement("li");
                    const label = document.createElement("span");
                    const value = document.createElement("span");
                    label.textContent = labels[i] + ": ";
                    value.textContent = data[i];
                    listItem.appendChild(label);
                    listItem.appendChild(value);
                    statsUl.appendChild(listItem);
                } 
                const chartData = {
                    labels: ["Passed", "Failed", "Average Marks", "Max Marks", "Min Marks"],
                    datasets: [
                        {
                            label: ["Statistics"],
                            data: [passedCount, failedCount, averageMarks, maxMarks, minMarks],
                            backgroundColor: "rgba(0, 255, 0,0.5)",
                            // [
                            //     "green",
                            //     "red",
                            //     "blue",
                            //     "purple",
                            //     "orange",
                            // ],
                        },
                    ],
                };
                chartData.datasets[0].data = chartData.datasets[0].data.map((value) =>
                    formatter.format(value)
                );
                destroyChartIfNecessary('myChart');
                const myChart = new Chart(ctx, {
                    type: "radar",
                    data: chartData,
                    options: {
                        maintainAspectRatio: false,
                        responsive: false,
                        scales: {
                            y:
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },

                        },
                    },
                });
                registerNewChart('myChart', myChart);
            }
            const canvas2 = document.getElementById("pie");
            let ctx2;
            let chartStatus2 = Chart.getChart("pie"); // <canvas> id
            if (chartStatus2 !== undefined) {
                chartStatus2.destroy();
            }
            if (canvas2) {
                ctx2 = canvas2.getContext("2d");
            }
            let range0_2 = 0;
            let range2_4 = 0;
            let range4_6 = 0;
            let range6_8 = 0;
            let range8_10 = 0;
            if (rows2) {
                for (let i = 1; i < rows2.length; i++) {
                    const finalGradeCell = rows2[i].getElementsByTagName("td")[6];
                    const finalGrade = Number(finalGradeCell.textContent);
                    if (finalGrade >= 0 && finalGrade < 2 && !rows2[i].classList.contains('hidden')) {
                        range0_2++;
                    } else if (finalGrade >= 2 && finalGrade < 4 && !rows2[i].classList.contains('hidden')) {
                        range2_4++;
                    } else if (finalGrade >= 4 && finalGrade < 6 && !rows2[i].classList.contains('hidden')) {
                        range4_6++;
                    } else if (finalGrade >= 6 && finalGrade < 8 && !rows2[i].classList.contains('hidden')) {
                        range6_8++;
                    } else if (finalGrade >= 8 && finalGrade <= 10 && !rows2[i].classList.contains('hidden')) {
                        range8_10++;
                    }
                }
                const statsUl = document.querySelector("#statscontent ul");
                const data = [range0_2, range2_4, range4_6, range6_8, range8_10];
                const labels = ["0-2", "2-4", "4-6", "6-8", "8-10"];
                for (let i = 0; i < data.length; i++) {
                    const listItem = document.createElement("li");
                    const label = document.createElement("span");
                    const value = document.createElement("span");
                    label.textContent = labels[i] + ": ";
                    value.textContent = data[i];
                    listItem.appendChild(label);
                    listItem.appendChild(value);
                    statsUl.appendChild(listItem);
                }
                const chartData = {
                    labels: ["0-2", "2-4", "4-6", "6-8", "8-10"],
                    datasets: [
                        {
                            label: "Grade Ranges",
                            data: [range0_2, range2_4, range4_6, range6_8, range8_10],
                            backgroundColor: [
                                "green",
                                "yellowgreen",
                                "yellow",
                                "orange",
                                "red",
                            ],
                        },
                    ],
                };
                destroyChartIfNecessary('pie');
                const pieChart = new Chart(ctx2, {
                    type: "doughnut",
                    data: chartData,
                    options: {
                        maintainAspectRatio: false,
                        responsive: false,
                        cutoutPercentage: 90,
                    },
                });
                registerNewChart('pie', pieChart);
            }
            const canvas3 = document.getElementById("line");
            let chartStatus3 = Chart.getChart("line"); // <canvas> id
            if (chartStatus3 !== undefined) {
                chartStatus3.destroy();
            }
            let ctx3;
            if (canvas3) {
                ctx3 = canvas3.getContext("2d");
            }
            const ticketTopics = {};
            const passedByTopic = {};
            const failedByTopic = {};
            for (let i = 1; i < rows2.length; i++) {
                const cells = rows2[i].getElementsByTagName("td");
                const topic = cells[3].textContent;
                const passed = cells[7].textContent === "Passed";
                if (!ticketTopics[topic]) {
                    ticketTopics[topic] = 0;
                    passedByTopic[topic] = 0;
                    failedByTopic[topic] = 0;
                }
                ticketTopics[topic]++;
                if (passed) {
                    passedByTopic[topic]++;
                } else {
                    failedByTopic[topic]++;
                }
            }

            const chartData = {
                labels: Object.keys(ticketTopics),
                datasets: [
                    {
                        label: "Passed",
                        data: Object.values(passedByTopic),
                        borderColor: "green",
                        backgroundColor: "green",

                        fill: false,
                        stack: "Stack 0",
                    },
                    {
                        label: "Failed",
                        data: Object.values(failedByTopic),
                        borderColor: "red",
                        backgroundColor: "red",
                        fill: false,
                        stack: "Stack 0",
                    },
                ],
            };

            // Create chart
            const lineChart = new Chart(ctx3, {
                type: "bar",
                data: chartData,
                options: {
                    maintainAspectRatio: false,
                    responsive: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                                stacked: true,
                            },
                        ],
                        xAxes: [
                            {
                                stacked: true,
                            },
                        ],
                    },
                },
            });


        }
        const [sortDirection, setSortDirection] = useState("asc");
        const [isSorting, setIsSorting] = useState(false);

        const sortTable = () => {
            setIsSorting(true);
            let table = document.getElementById("myTable");
            let rows = Array.from(table.getElementsByTagName("tr")).slice(1);
            rows.forEach(row => {
                row.removeEventListener('click', rowClickHandler);
            });

            let sortedRows = rows.sort(function (a, b) {
                let nameA = a.getElementsByTagName("td")[1].textContent.toUpperCase();
                let nameB = b.getElementsByTagName("td")[1].textContent.toUpperCase();
                if (sortDirection === "asc") {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                } else {
                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                }
                return 0;
            });
            for (let i = 0; i < sortedRows.length; i++) {
                table.tBodies[0].appendChild(sortedRows[i]);
            }
            setIsSorting(false);
            updateSortDirection();
        };

        const updateSortDirection = () => {
            let nameHeader = document.getElementById("name-header");
            if (isSorting) {
                return;
            }
            if (sortDirection === "asc") {
                nameHeader.innerHTML = "Name &#8595;";
                setSortDirection("desc");
            } else {
                nameHeader.innerHTML = "Name &#8593;";
                setSortDirection("asc");
            }
        };
        const resetsortTable = () => {
            let table = document.getElementById("myTable");
            let rows = Array.from(table.getElementsByTagName("tr")).slice(1);
            rows.forEach(row => {
                if (row.classList.contains("hidden")) {
                    row.classList.remove("hidden");
                }
            });
            let sortedRows = rows.sort(function (a, b) {
                let nameA = Number(a.getElementsByTagName("td")[0].textContent);
                let nameB = Number(b.getElementsByTagName("td")[0].textContent);
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            for (let i = 0; i < sortedRows.length; i++) {
                table.tBodies[0].appendChild(sortedRows[i]);
            }
            updatestat();
        };
        const resetBtn = document.getElementById("reset-btn");
        if (resetBtn) {
            resetBtn.addEventListener("click", resetsortTable);
        }


        let tbody = document.getElementById('myTable');

        document.addEventListener("DOMContentLoaded", function () {
            let table = document.querySelector("tbody");
            let rows;
            if (table) {
                rows = table.getElementsByTagName("tr");
            }
        });

        const so = document.getElementById('sort');
        if (so) {
            so.addEventListener('click', sortTable, { once: true })
        }
        const so2 = document.getElementById('name-header');
        if (so2) {
            so2.addEventListener('click', sortTable, { once: true })
        }
        const sortTable2 = () => {
            setIsSorting(true);
            let table = document.getElementById("myTable");
            let rows = Array.from(table.getElementsByTagName("tr")).slice(1);
            rows.forEach(row => {
                row.removeEventListener('click', rowClickHandler);
            });

            let sortedRows = rows.sort(function (a, b) {
                let nameA = Number(a.getElementsByTagName("td")[6].textContent);
                let nameB = Number(b.getElementsByTagName("td")[6].textContent);
                if (sortDirection === "asc") {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                } else {
                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                }
                return 0;
            });
            for (let i = 0; i < sortedRows.length; i++) {
                table.tBodies[0].appendChild(sortedRows[i]);
            }
            // rows.forEach(row => {
            //     row.addEventListener('click', rowClickHandler);
            // });
            setIsSorting(false);
            updateSortDirection2();
        };

        const updateSortDirection2 = () => {
            let nameHeader = document.getElementById("final-grade");
            if (isSorting) {
                return;
            }
            if (sortDirection === "asc") {
                nameHeader.innerHTML = "Final Grade &#8595;";
                setSortDirection("desc");
            } else {
                nameHeader.innerHTML = "Final Grade &#8593;";
                setSortDirection("asc");
            }
        };
        const so3 = document.getElementById('final-grade');
        if (so3) {
            so3.addEventListener('click', sortTable2, { once: true })
        }
        function rowClickHandler(event) {
            if (event.target.innerHTML !== 'Details') {
                if (!this.classList.contains("selected")) {
                    this.classList.add("selected");
                    let nameCell = this.getElementsByTagName("td")[1];
                    let name = nameCell.textContent;
                    nameCell.textContent = name.toUpperCase();
                }
                // revert name to original format if row is deselected
                else {
                    this.classList.remove("selected");
                    let nameCell = this.getElementsByTagName("td")[1];
                    let name = nameCell.textContent;
                    nameCell.textContent = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                }
            }
        };
        let tableRows = Array.from(document.getElementById("myTable").getElementsByTagName("tr"));
        tableRows.slice(1).forEach(row => {
            row.addEventListener('click', rowClickHandler);
        });

        function filterTable() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("filterInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 1; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
        if (document.getElementById("filterInput")) {
            document.getElementById("filterInput").addEventListener("keyup", filterTable);

        }
        const passedBtn = document.getElementById("passed-btn");
        const failedBtn = document.getElementById("failed-btn");

        let passedFilter = false;
        let failedFilter = false;

        const filterTable2 = () => {
            const table = document.getElementById("myTable");
            const rows = table.getElementsByTagName("tr");
            for (let i = 1; i < rows.length; i++) {
                const statusCell = rows[i].getElementsByTagName("td")[7];
                const status = statusCell.textContent;
                if (passedFilter && status !== "Passed") {
                    rows[i].classList.add("hidden");
                } else if (failedFilter && status !== "Failed") {
                    rows[i].classList.add("hidden");
                } else {
                    rows[i].classList.remove("hidden");
                }
            }
        }

        const togglePassedFilter = () => {
            passedFilter = !passedFilter;
            failedFilter = false;
            filterTable2();
        }

        const toggleFailedFilter = () => {
            failedFilter = !failedFilter;
            passedFilter = false;
            filterTable2();
        }
        if (passedBtn) {
            passedBtn.addEventListener("click", () => {
                if (passedFilter) {
                    passedFilter = false;
                    filterTable2();
                } else {
                    togglePassedFilter();
                }
                updatestat();
            });

        }
        if (failedBtn) {
            failedBtn.addEventListener("click", () => {
                if (failedFilter) {
                    failedFilter = false;
                    filterTable2();
                } else {
                    toggleFailedFilter();
                }
                updatestat();
            });
        }
        const statisticsBtn = document.getElementById("stats");
        const statcont = document.getElementById('statistics')
        function forstat() {
            if (statcont) {
                statcont.classList.remove('hidden')
            }
            // updatestat()
        }
        if (statisticsBtn) {
            statisticsBtn.addEventListener("click", forstat);
            statisticsBtn.addEventListener('click', updatestat)
        }

        const btst = document.getElementById('hidestats')
        if (btst) {
            btst.addEventListener('click', () => {
                statcont.classList.add('hidden');
            })
        }
        function downloadTable() {
            // Get the table element
            let table = document.getElementById("myTable");
            // Create a new CSV file
            let csvContent = "data:text/csv;charset=utf-8,";
            // Loop through each row in the table
            let rows = table.getElementsByTagName("tr");
            for (let i = 0; i < rows.length; i++) {
                let cells = rows[i].getElementsByTagName("td");
                let rowContent = "";
                for (let j = 0; j < cells.length; j++) {
                    rowContent += cells[j].textContent + ",";
                }
                csvContent += rowContent + "\r\n";
            }
            // Create a link and trigger the download
            let link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", "table.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        const csv = document.getElementById('downloadTable')
        if (csv) {
            csv.addEventListener('click', downloadTable)
        }

        function downloadPDF() {
            // Create new jsPDF instance
            let doc = new jsPDF();
            // Add table content using autotable plugin
            doc.autoTable({ html: '#myTable' });
            // Save PDF file with a unique name
            doc.save('myTable.pdf');
        }
        const pdf = document.getElementById('downloadPDF');
        if (pdf) {
            pdf.addEventListener('click', downloadPDF)
        }
    }
    const tb = document.querySelector('tbody');
    if (tb) {
        Tryr();
    } 

    return ( 
        <>
            <input type="text" id="filterInput" placeholder="Type to filter..." />
            <button id="downloadTable">Download as CSV</button>
            <button id="downloadPDF">Download as PDF</button>
            {/* <button onClick="downloadTableAsText()">Download as Text</button>
            <button onClick="downloadTableAsJSON()">Download as JSON</button> */}
            <button id="sort"> Sort by Name</button>
            <button id="passed-btn">Passed</button>
            <button id="failed-btn">Failed</button>
            <button id="reset-btn">Reset</button>
        </>
    )
} 
