// for loading and displaying trend visuals

// temporary kmeans cluster data
const kmeansResults = [
  { label: "Cluster #1", value: 123 },
  { label: "Cluster #2", value: 234 },
  { label: "Cluster #3", value: 345 }
];

// temporary dbscan cluster data
const dbscanResults = [
  { label: "Cluster #1", value: 100 },
  { label: "Cluster #2", value: 215 },
  { label: "Cluster #3", value: 330 },
  { label: "Cluster #4", value: 445 },
];

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

// call the chart
drawChart('kmeansChart', kmeansResults, 'Distribution');
drawChart('dbscanChart', dbscanResults, 'Distribution');
