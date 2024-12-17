// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter(meta=> meta.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}:${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesField = data.samples;

    // Filter the samples for the object with the desired sample number
    let samplesResult = samplesField.filter(item=> item.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = samplesResult.otu_ids;
    let otuLabels = samplesResult.otu_labels;
    let sampleValues = samplesResult.sample_values;

    // Build a Bubble Chart
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
    
    let bubbleData = [bubbleTrace];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"},
      height: 600,
      width: 1300
    };

    // // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true});

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barTrace = {
      x: sampleValues.slice(0, 10).reverse(),
      y: yticks,
      text: otuLabels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let barData = [barTrace];
    
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"},
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}    

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((name) => {
      dropdownMenu.append("option").text(name).property("value", name);
    });
  
    // Get the first sample from the list
    const firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
