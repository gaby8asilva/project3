// for loading and displaying trend visuals

// kmeans cluster data using results from kmeans_results.json
 const kmeansResults = [
   { label: "Cluster 1", value: 49831 },
   { label: "Cluster 2", value: 25030 },
   { label: "Cluster 3", value: 25139 }
 ];

// kmeans breakdown data results from style_breakdown_kmeans.json
const styleBreakdownByCluster = {
  "boho chic":   [7025, 2839, 1324],
  "clean girl":  [6807, 2779, 1451],
  "coquette":    [7041, 2680, 1409],
  "cottage core":[6839, 2835, 1426],
  "grunge":      [6878, 2796, 1370],
  "minimalist":  [6916, 2716, 1380],
  "old money":   [7035, 2685, 1383],
  "streetwear":  [7046, 2725, 1495],
  "y2k":         [7010, 2719, 1391]
};

// kmeans breakdown data results from season_breakdown_kmeans.json
const seasonBreakdownByCluster = {
  "Fall":    [20777, 0, 4253],
  "Spring":  [20867, 0, 4190],
  "Winter":  [20953, 0, 4186],
  "Summer":  [0, 24774, 0]
};

// kmeans breakdown data results from color_breakdown_kmeans.json
const colorBreakdownByCluster = {
  "bright":      [12688, 4073, 0],
  "metallics":   [12568, 4153, 0],
  "neutrals":    [12436, 4169, 0],
  "pastels":     [12478, 4080, 0],
  "patterns":    [12427, 4200, 0],
  "monochrome":  [0, 4099, 12629]
};


// dbscan cluster data using results from dbscan_results.json
const dbscanResults = [
  { label: "Cluster 1", value: 65 },
  { label: "Cluster 2", value: 64 },
  { label: "Cluster 3", value: 68 },
  { label: "Cluster 4", value: 60 },
  { label: "Cluster 5", value: 60 },
  { label: "Cluster 6", value: 60 },
  { label: "Cluster 7", value: 61 },
  { label: "Cluster 8", value: 60 },
  { label: "Noise",     value: 99502 }
];

// dbscan breakdown data results from style_breakdown_dbscan.json
const styleBreakdownByClusterDBSCAN = {
  "boho chic":    [0, 0, 0, 0, 0, 0, 0, 0, 11188],
  "clean girl":   [0, 0, 0, 0, 0, 0, 0, 0, 11037],
  "coquette":     [65, 0, 0, 0, 0, 0, 0, 0, 11065],
  "cottage core": [0, 64, 0, 0, 60, 0, 0, 0, 10976],
  "grunge":       [0, 0, 0, 0, 0, 0, 0, 0, 11044],
  "minimalist":   [0, 0, 68, 0, 0, 0, 0, 0, 10944],
  "old money":    [0, 0, 0, 0, 0, 0, 0, 60, 11043],
  "streetwear":   [0, 0, 0, 60, 0, 60, 61, 0, 11085],
  "y2k":          [0, 0, 0, 0, 0, 0, 0, 0, 11120]
};

// dbscan breakdown data results from season_breakdown_dbscan.json
const seasonBreakdownByClusterDBSCAN = {
  "Fall":   [0, 0, 68, 0, 0, 0, 0, 0, 24962],
  "Spring": [0, 0, 0, 60, 0, 60, 0, 60, 24877],
  "Summer": [65, 0, 0, 0, 0, 0, 61, 0, 24648],
  "Winter": [0, 64, 0, 0, 60, 0, 0, 0, 25015]
};

// dbscan breakdown data results from color_breakdown_dbscan.json
const colorBreakdownByClusterDBSCAN = {
  "bright":      [0, 0, 0, 0, 0, 60, 0, 0, 16701],
  "metallics":   [65, 0, 0, 0, 0, 0, 0, 0, 16656],
  "monochrome":  [0, 0, 0, 60, 0, 0, 0, 60, 16608],
  "neutrals":    [0, 0, 0, 0, 60, 0, 61, 0, 16484],
  "pastels":     [0, 64, 68, 0, 0, 0, 0, 0, 16426],
  "patterns":    [0, 0, 0, 0, 0, 0, 0, 0, 16627]
};




// draws chart
function drawChart(chartId, data, title) {
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const context = document.getElementById(chartId).getContext('2d');
  new Chart(context, {type: 'bar', data: { labels: labels, datasets: [{ label: 'Number of Outfits',
        data: values, backgroundColor: 'blue' }]}, options: { plugins: { title: { display: true,
          text: title }, legend: { display: false } }, responsive: true, scales: { y: {
          beginAtZero: true, title: { display: true, text: 'Outfit Count' } } } } });
}

// breakdown by style kmeans
const clusterLabels = ["Cluster 1", "Cluster 2", "Cluster 3"];
const styleTags = Object.keys(styleBreakdownByCluster);

const datasets = styleTags.map((style, index) => {
  return {
    label: style,
    data: styleBreakdownByCluster[style],
    backgroundColor: `hsl(${index * 40}, 70%, 60%)`
  };
});

const ctxStyle = document.getElementById("styleBreakdownChart").getContext("2d");

new Chart(ctxStyle, {
  type: "bar",
  data: {
    labels: clusterLabels,
    datasets: datasets
  },
  options: {
    responsive: true,
    plugins: {title: { display: true, text: "Style Tag Distribution Within Each Cluster"},
      tooltip: { mode: "index", intersect: false }},
    scales: {x: { stacked: true }, y: {stacked: true, beginAtZero: true, title: { display: true, text: "Outfit Count" }
      }}}
});


// breakdown by season kmeans
const clusterLabelsSeason = ["Cluster 1", "Cluster 2", "Cluster 3"];
const seasonTags = Object.keys(seasonBreakdownByCluster);

const seasonDatasets = seasonTags.map((season, index) => {
  return {
    label: season,
    data: seasonBreakdownByCluster[season],
    backgroundColor: `hsl(${index * 90}, 70%, 60%)`
  };
});

const ctxSeason = document.getElementById("seasonBreakdownChart").getContext("2d");

new Chart(ctxSeason, {
  type: "bar",
  data: {
    labels: clusterLabelsSeason,
    datasets: seasonDatasets
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Season Tag Distribution Within Each Cluster"
      },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { stacked: true },
      y: {stacked: true, beginAtZero: true, title: { display: true, text: "Outfit Count" }} } }
});

// breakdown by color kmeans
const clusterLabelsColor = ["Cluster 1", "Cluster 2", "Cluster 3"];
const colorTags = Object.keys(colorBreakdownByCluster);

const colorDatasets = colorTags.map((color, index) => {
  return {
    label: color,
    data: colorBreakdownByCluster[color],
    backgroundColor: `hsl(${index * 50}, 65%, 55%)`
  };
});

const ctxColor = document.getElementById("colorBreakdownChart").getContext("2d");

new Chart(ctxColor, {
  type: "bar",
  data: {
    labels: clusterLabelsColor,
    datasets: colorDatasets
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Color Tag Distribution Within Each Cluster"
      },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: "Outfit Count" }
      }
    }
  }
});

// fetch("../../kmeans_results.json")
//   .then(response => response.json())
//   .then(data => {
//     drawChart("kmeansChart", data, "K-Means: Cluster Sizes");
//   });

drawChart('kmeansChart', kmeansResults, 'Distribution');
// drawGroupedBarChart("styleBreakdownChart", styleBreakdownData, "Style Tag Distribution (K-Means)");
// drawGroupedBarChart("seasonBreakdownChart", seasonBreakdownData, "Season Tag Distribution (K-Means)");
// drawGroupedBarChart("colorBreakdownChart", colorBreakdownData, "Color Tag Distribution (K-Means)");


drawChart('dbscanChart', dbscanResults, 'Distribution');

// draw dbscan brokendown
const clusterLabelsDBSCAN = dbscanResults.map(c => c.label);
const styleTagsDBSCAN = Object.keys(styleBreakdownByClusterDBSCAN);
const styleDatasetsDBSCAN = styleTagsDBSCAN.map((style, index) => ({
  label: style,
  data: styleBreakdownByClusterDBSCAN[style],
  backgroundColor: `hsl(${index * 35}, 70%, 60%)`
}));
new Chart(document.getElementById("styleBreakdownChartDBSCAN").getContext("2d"), {
  type: "bar",
  data: { labels: clusterLabelsDBSCAN, datasets: styleDatasetsDBSCAN },
  options: { responsive: true, plugins: { title: { display: true, text: "Style Tag Distribution (DBSCAN)" } }, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }
});

const seasonTagsDBSCAN = Object.keys(seasonBreakdownByClusterDBSCAN);
const seasonDatasetsDBSCAN = seasonTagsDBSCAN.map((season, index) => ({
  label: season,
  data: seasonBreakdownByClusterDBSCAN[season],
  backgroundColor: `hsl(${index * 90}, 65%, 65%)`
}));
new Chart(document.getElementById("seasonBreakdownChartDBSCAN").getContext("2d"), {
  type: "bar",
  data: { labels: clusterLabelsDBSCAN, datasets: seasonDatasetsDBSCAN },
  options: { responsive: true, plugins: { title: { display: true, text: "Season Tag Distribution (DBSCAN)" } }, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }
});

const colorTagsDBSCAN = Object.keys(colorBreakdownByClusterDBSCAN);
const colorDatasetsDBSCAN = colorTagsDBSCAN.map((color, index) => ({
  label: color,
  data: colorBreakdownByClusterDBSCAN[color],
  backgroundColor: `hsl(${index * 60}, 75%, 55%)`
}));
new Chart(document.getElementById("colorBreakdownChartDBSCAN").getContext("2d"), {
  type: "bar",
  data: { labels: clusterLabelsDBSCAN, datasets: colorDatasetsDBSCAN },
  options: { responsive: true, plugins: { title: { display: true, text: "Color Tag Distribution (DBSCAN)" } }, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }
});

