import math
import random
import json
import pandas

def initialize_centroids(data_points, number_of_clusters):
    return random.sample(data_points, number_of_clusters)

def assign_points_to_clusters(data_points, centroids):
    clusters = [[] for _ in centroids]
    for point in data_points:
        closest_centroid_index = None
        smallest_distance = float('inf')
        for centroid_index, centroid in enumerate(centroids):
            squared_sum = 0.0
            for coordinate_index in range(len(point)):
                diff = point[coordinate_index] - centroid[coordinate_index]
                squared_sum += diff * diff
            distance = math.sqrt(squared_sum)
            if distance < smallest_distance:
                smallest_distance = distance
                closest_centroid_index = centroid_index
        clusters[closest_centroid_index].append(point)
    return clusters

def update_centroids_for_clusters(clusters):
    new_centroids = []
    for cluster in clusters:
        if len(cluster) == 0:
            new_centroids.append([])
            continue
        dimension_count = len(cluster[0])
        centroid = []
        for coordinate_index in range(dimension_count):
            sum_of_values = sum(point[coordinate_index] for point in cluster)
            average_value = sum_of_values / len(cluster)
            centroid.append(average_value)
        new_centroids.append(centroid)
    return new_centroids

def kmeans(data_points, number_of_clusters, maximum_iterations=100):
    centroids = initialize_centroids(data_points, number_of_clusters)
    for _ in range(maximum_iterations):
        clusters = assign_points_to_clusters(data_points, centroids)
        updated_centroids = update_centroids_for_clusters(clusters)
        if updated_centroids == centroids:
            break
        centroids = updated_centroids

    labels = []
    for point in data_points:
        closest_centroid_index = None
        smallest_distance = float('inf')
        for centroid_index, centroid in enumerate(centroids):
            squared_sum = 0.0
            for coordinate_index in range(len(point)):
                diff = point[coordinate_index] - centroid[coordinate_index]
                squared_sum += diff * diff
            distance = math.sqrt(squared_sum)
            if distance < smallest_distance:
                smallest_distance = distance
                closest_centroid_index = centroid_index
        labels.append(closest_centroid_index)
    return labels

# loading and making the categories numerical
outfit_data = pandas.read_csv("../../data/outfits_dataset.csv")
features = pandas.get_dummies(outfit_data[['Color_Tag', 'Item1_Tag', 'Style_Tag', 'Season_Tag']])
data_points = features.to_numpy().tolist()

# 3 clusters
cluster_labels = kmeans(data_points, number_of_clusters=3)
outfit_data['Cluster'] = cluster_labels

cluster_counts = {}
for label in cluster_labels:
    cluster_name = f"Cluster {label + 1}"
    cluster_counts[cluster_name] = cluster_counts.get(cluster_name, 0) + 1
output = [{"label": cluster, "value": count} for cluster, count in sorted(cluster_counts.items())] # frontend purposes
with open("../../frontend/kmeans_results.json", "w") as file:
    json.dump(output, file)

print("K-Means results saved")

# breaking down clusters for visual purposes
def generate_breakdown(outfit_data, tag_column, output_filename):
    breakdown = outfit_data.groupby(['Cluster', tag_column]).size().unstack(fill_value=0)
    output_results = {}
    for cluster_num, row in breakdown.iterrows():
        cluster_name = f"Cluster {cluster_num + 1}"
        output_results[cluster_name] = row[row > 0].to_dict()
    with open(f"../../frontend/{output_filename}", "w") as fileName:
        json.dump(output_results, fileName)
    print(f"Saved {output_filename}")

generate_breakdown(outfit_data, 'Style_Tag', 'style_breakdown_kmeans.json')
generate_breakdown(outfit_data, 'Color_Tag', 'color_breakdown_kmeans.json')
generate_breakdown(outfit_data, 'Season_Tag', 'season_breakdown_kmeans.json')
