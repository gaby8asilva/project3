// for loading and displaying trend visuals

// kmeans cluster data using results from kmeans_results.json
 const kmeansResults = [
   { label: "Cluster 1", value: 49831 },
   { label: "Cluster 2", value: 25030 },
   { label: "Cluster 3", value: 25139 }
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

drawChart('kmeansChart', kmeansResults, 'Distribution');


// fetch("../../kmeans_results.json")
//   .then(response => response.json())
//   .then(data => {
//     drawChart("kmeansChart", data, "K-Means: Cluster Sizes");
//   });

drawChart('dbscanChart', dbscanResults, 'Distribution');
