document.addEventListener("DOMContentLoaded", () => {
    const energyRecievedData = [
      ["ABUJA", "assets/DiscoLogos/AEdc logo.png", 1068, 63.1, 63.1, 63.1, 63.1, 63.1, 63.1, 63.1],
      ["BENIN", "assets/DiscoLogos/BEDc logo.png", 2709, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["EKO", "assets/DiscoLogos/ekedc logo.png", 3657, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["ENUGU", "assets/DiscoLogos/EEDc logo.png", 1508, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["IBADAN", "assets/DiscoLogos/IBEDC logo.png", 9999, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["IKEJA", "assets/DiscoLogos/Ikeja electric logo.png", 10098, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["JOS", "assets/DiscoLogos/jedc logo.png", 5680, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["KADUNA", "assets/DiscoLogos/kaduna electric logo.png", 3923, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["KANO", "assets/DiscoLogos/kano edc logo.png", 7745, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["PH", "assets/DiscoLogos/phedc logo.png", 6529, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8],
      ["YOLA", "assets/DiscoLogos/yedc logo.png", 2431, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8, 27.8]
    ];
  
    const tbodyReceived = document.querySelector("#energyRecievedTable tbody");
  
    // Function to create table rows
    energyRecievedData.forEach(rowData => {
      const row = document.createElement("tr");
  
      const gencoCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = rowData[1];
      img.alt = rowData[0];
      img.style.maxWidth = '25px'; // Ensure the image size is consistent
      img.style.marginRight = '10px';
      gencoCell.appendChild(img);
      const text = document.createTextNode(rowData[0]);
      gencoCell.appendChild(text);
      row.appendChild(gencoCell);
  
      for (let i = 2; i < rowData.length; i++) {
        const cell = document.createElement("td");
        cell.textContent = rowData[i];
        row.appendChild(cell);
      }
  
      tbodyReceived.appendChild(row);
    });
  
    // Function to calculate totals
    function calculateTotals() {
      const totals = Array(energyRecievedData[0].length - 2).fill(0);
  
      energyRecievedData.forEach(row => {
        row.slice(2).forEach((cell, index) => {
          totals[index] += parseFloat(cell);
        });
      });
  
      document.getElementById("energyRecievedTotalTotal").textContent = totals[0].toFixed(2);
      document.getElementById("energyRecievedTotal2023").textContent = totals[1].toFixed(2);
      document.getElementById("energyRecievedTotal2022").textContent = totals[2].toFixed(2);
      document.getElementById("energyRecievedTotal2021").textContent = totals[3].toFixed(2);
      document.getElementById("energyRecievedTotal2020").textContent = totals[4].toFixed(2);
      document.getElementById("energyRecievedTotal2019").textContent = totals[5].toFixed(2);
      document.getElementById("energyRecievedTotal2018").textContent = totals[6].toFixed(2);
      document.getElementById("energyRecievedTotal2017").textContent = totals[7].toFixed(2);
    }
  
    calculateTotals();
  
    let sortDirection = 1;
    let currentSortColumn = -1;
  
    // Function to sort table
    function sortTable(columnIndex) {
      const rows = Array.from(tbodyReceived.querySelectorAll("tr"));
      const headerCells = document.querySelectorAll("thead th");
  
      if (currentSortColumn !== columnIndex) {
        sortDirection = 1;
        currentSortColumn = columnIndex;
      } else {
        sortDirection *= -1;
      }
  
      rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();
  
        if (!isNaN(aText) && !isNaN(bText)) {
          return (Number(aText) - Number(bText)) * sortDirection;
        }
  
        return aText.localeCompare(bText) * sortDirection;
      });
  
      rows.forEach(row => tbodyReceived.appendChild(row));
  
      headerCells.forEach((header, index) => {
        const arrow = header.querySelector(".sort-arrow");
        if (arrow) {
          arrow.style.visibility = "hidden";
          if (index === columnIndex) {
            arrow.style.visibility = "visible";
            arrow.style.transform = sortDirection === 1 ? "rotate(180deg)" : "rotate(0deg)";
          }
        }
      });
    }
  
    document.querySelectorAll("thead th").forEach((header, index) => {
      const arrow = document.createElement("span");
      arrow.className = "sort-arrow";
      header.appendChild(arrow);
      header.addEventListener("click", () => sortTable(index));
    });
  });
  