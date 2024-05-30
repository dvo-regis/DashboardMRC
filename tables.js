const tableData = [
    ["AFAM IV&V (GAS)", "assets/GencoLogos/Afam Power.png", 64.3, 64.3, 67.5, 45.90, 560, 209, 350, 305],
    ["AFAM VI (GAS/STEAM)", "assets/GencoLogos/Afam Power.png", 305.8, 305.8, 400, 209, 398, 355, 599, 776],
    ["ALAOJI NIPP (GAS)", "assets/NDPHC.png", 161, 161, 235, 130, 443, 790, 214, 780],
    ["AZURA-EDO IPP (GAS)", "assets/GencoLogos/Azura Power.png", 299, 299, 456, 200, 224, 445, 3450, 45.90],
    ["DADINKOWA G.S (HYDRO)", "assets/GencoLogos/Dadinkowa.png", 115, 115, 780, 350, 214, 330, 776, 350],
    ["DELTA (GAS)", "assets/Delta gas.png", 380, 380, 599, 3450, 2387, 1002, 305, 45.90],
    ["EGBIN (STEAM)", "assets/GencoLogos/Egbin Power.png", 538.0, 538, 455, 6780, 980, 776, 3450, 400],
    ["KAINJI POWER", "assets/NDPHC.png", 4590, 1200, 1000, 2389, 489, 888, 909, 305],   
    ["GEREGU (GAS)", "assets/GencoLogos/Geregu Power.png", 161, 161, 235, 130, 443, 790, 214, 780],
    ["GEREGU NIPP (GAS)", "assets/GencoLogos/Geregu Power.png", 299, 299, 456, 200, 224, 445, 3450, 45.90],
    ["IBOM POWER (GAS)", "assets/GencoLogos/ibom power.png", 115, 115, 780, 350, 214, 330, 776, 350],
    ["IHOVBOR NIPP (GAS)", "assets/NDPHC.png", 380, 380, 599, 3450, 2387, 1002, 305, 45.90],
    ["KAINJI (HYDRO)", "assets/NDPHC.png", 538.0, 538, 455, 6780, 980, 776, 3450, 400],
    ["ODUKPANI NIPP (GAS)", "assets/NDPHC.png", 4590, 1200, 1000, 2389, 489, 888, 909, 305],
    ["OKPAI (GAS/STEAM)", "assets/GencoLogos/Okpai.png", 64.3, 64.3, 67.5, 45.90, 560, 209, 350, 305],
    ["OLORUNSOGO (GAS)", "assets/GencoLogos/Olurunsogo.png", 305.8, 305.8, 400, 209, 398, 355, 599, 776],
    ["OLORUNSOGO NIPP (GAS)", "assets/NDPHC.png", 161, 161, 235, 130, 443, 790, 214, 780],
    ["OMOKU (GAS)", "assets/GencoLogos/Rivers ipp.png", 299, 299, 456, 200, 224, 445, 3450, 45.90],
    ["OMOTOSHO (GAS)", "assets/GencoLogos/Omotosho gas.png", 115, 115, 780, 350, 214, 330, 776, 350],
    ["OMOTOSHO NIPP (GAS)", "assets/NDPHC.png", 380, 380, 599, 3450, 2387, 1002, 305, 45.90],
    ["PARAS ENERGY (GAS)", "assets/GencoLogos/Paras Energy.png", 538.0, 538, 455, 6780, 980, 776, 3450, 400],
    ["RIVERS IPP (GAS)", "assets/GencoLogos/Rivers ipp.png", 4590, 1200, 1000, 2389, 489, 888, 909, 305],   
    ["SAPELE (STEAM)", "assets/GencoLogos/Sapele ipp.png", 161, 161, 235, 130, 443, 790, 214, 780],
    ["SAPELE NIPP (GAS)", "assets/NDPHC.png", 299, 299, 456, 200, 224, 445, 3450, 45.90],
    ["SHIRORO (HYDRO)", "assets/GencoLogos/Shiroro Hydro ipp.png", 115, 115, 780, 350, 214, 330, 776, 350],
    ["TRANS-AMADI (GAS)", "assets/GencoLogos/Rivers ipp.png", 380, 380, 599, 3450, 2387, 1002, 305, 45.90]
];

const tbody = document.querySelector("#GencoTable tbody");

tableData.forEach(rowData => {
  const row = document.createElement("tr");

  const gencoCell = document.createElement("td");
  const img = document.createElement("img");
  img.src = rowData[1];
  const text = document.createTextNode(rowData[0]);
  gencoCell.appendChild(img);
  gencoCell.appendChild(text);
  row.appendChild(gencoCell);

  for (let i = 2; i < rowData.length; i++) {
    const cell = document.createElement("td");
    cell.textContent = rowData[i];
    row.appendChild(cell);
  }

  tbody.appendChild(row);
});

calculateTotals();

function sortTable(n) {
  const table = document.getElementById("GencoTable");
  let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir == "asc") {
        if (!isNaN(parseFloat(x.innerHTML)) && !isNaN(parseFloat(y.innerHTML))) {
          if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (!isNaN(parseFloat(x.innerHTML)) && !isNaN(parseFloat(y.innerHTML))) {
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }

  updateSortArrows(n, dir);
}

function updateSortArrows(columnIndex, direction) {
  const headers = document.querySelectorAll("th");

  headers.forEach((header, index) => {
    const arrow = header.querySelector(".sort-arrow");
    if (arrow) {
      arrow.style.visibility = "hidden";
      header.classList.remove("sort-asc", "sort-desc");
      if (index === columnIndex) {
        arrow.style.visibility = "visible";
        header.classList.add(direction === "asc" ? "sort-asc" : "sort-desc");
      }
    }
  });
}

function calculateTotals() {
  const totals = Array(tableData[0].length - 2).fill(0);

  tableData.forEach(row => {
    row.slice(2).forEach((cell, index) => {
      totals[index] += parseFloat(cell);
    });
  });

  document.getElementById("totalTotal").textContent = totals[0].toFixed(2);
  document.getElementById("total2023").textContent = totals[1].toFixed(2);
  document.getElementById("total2022").textContent = totals[2].toFixed(2);
  document.getElementById("total2021").textContent = totals[3].toFixed(2);
  document.getElementById("total2020").textContent = totals[4].toFixed(2);
  document.getElementById("total2019").textContent = totals[5].toFixed(2);
  document.getElementById("total2018").textContent = totals[6].toFixed(2);
  document.getElementById("total2017").textContent = totals[7].toFixed(2);
}
