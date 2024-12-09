![Built with D3.js](https://img.shields.io/badge/Built_with-D3.js-orange?logo=d3.js&logoColor=white)
![Built with Plotly.js](https://img.shields.io/badge/Built_with-Plotly.js-3b4d99?logo=plotly&logoColor=white)

# Dashboard to Visualize Bacteria Cultures

This project provides an interactive dashboard built using JavaScript, D3.js, and Plotly.js to analyze and visualize bacteria cultures in different samples. The dashboard fetches data from a JSON file and dynamically updates charts and metadata panels based on user interactions.

---

## Features

1. **Metadata Panel**  
   Displays information about the selected sample, such as demographics or other relevant metadata.
![image](https://github.com/user-attachments/assets/9cc443a6-1099-4a5e-ab4c-6f427d8c6f9c)

2. **Bubble Chart**  
   Visualizes the distribution of bacteria cultures using bubble size and color to represent their abundance and types.
![image](https://github.com/user-attachments/assets/a1c8c1f0-7987-462d-ab44-8411a0e660ef)

3. **Bar Chart**  
   Highlights the top 10 most abundant bacteria cultures in a horizontal bar chart.
![image](https://github.com/user-attachments/assets/dbaaf698-06ec-4cce-bb2e-815d7049a542)

4. **Dynamic Dropdown**  
   Allows users to select samples from a dropdown menu, dynamically updating the charts and metadata.
![image](https://github.com/user-attachments/assets/9a135448-2c01-4b6d-9218-e79ea571144b)

---

## Code Breakdown

### 1. **Metadata Panel**

The `buildMetadata` function populates the metadata panel by:
- Fetching data from the JSON file.
- Filtering metadata based on the selected sample.
- Using D3 to dynamically append and display key-value pairs.

```javascript
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let metadata = data.metadata;
    let result = metadata.filter(meta => meta.id == sample)[0];
    let panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}
```

---

### 2. **Charts** 
#### **Bubble Chart**
The `buildCharts` function creates a bubble chart to visualize the overall abundance of bacteria.

```javascript
let bubbleTrace = {
  x: otuIds,
  y: sampleValues,
  text: otuLabels,
  mode: "markers",
  marker: {
    size: sampleValues,
    color: otuIds,
    colorscale: "Earth"
  }
};
Plotly.newPlot("bubble", [bubbleTrace], {
  title: "Bacteria Cultures Per Sample",
  xaxis: { title: "OTU ID" },
  yaxis: { title: "Number of Bacteria" },
  height: 600,
  width: 1300
});
```
#### **Bar Chart**
Displays the top 10 bacteria cultures in descending order.

```javascript
let barTrace = {
  x: sampleValues.slice(0, 10).reverse(),
  y: otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse(),
  text: otuLabels.slice(0, 10).reverse(),
  type: "bar",
  orientation: "h"
};
Plotly.newPlot("bar", [barTrace], {
  title: "Top 10 Bacteria Cultures Found",
  xaxis: { title: "Number of Bacteria" },
  margin: { l: 100, r: 100, t: 100, b: 100 }
});
```
---

### 3. **Initialization and Event Handling** 
The init function loads the dataset and ini

```javascript
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let sampleNames = data.names;
    let dropdownMenu = d3.select("#selDataset");
    sampleNames.forEach(name => {
      dropdownMenu.append("option").text(name).property("value", name);
    });
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
```
The `optionChanged` function updates the dashboard when a new sample is selected.

```javascript
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}
```
---
## Usage 

1. Clone or download this repository.
2. Open the HTML file in a web browser.
3. Interact with the dropdown menu to explore data for different samples.
4. View updated charts and metadata as you select different samples.

## Dependencies

* **D3.js** for DOM manipulation and data fetching.
* **Plotly.js** for interactive visualizations.

---

## Acknowledgments

This project was developed with the assistance of the following resources:

- **Turtoring Session** – Provided guidance on data analysis.
- **Xpert Learning Assistant** – Provided guidance on and data analysis.
- **GitLab UofT Activities** – Supplied foundational activities and exercises for analysis.
- **ChatGPT** – Assisted with code, explanations, and README formatting. 
