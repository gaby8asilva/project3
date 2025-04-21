import pandas as pd
import math

class SimpleDBSCAN:
    def __init__(self, eps, min_samples):
        self.eps = eps  # Maximum distance between points for them to be considered in the same neighborhood
        self.min_samples = min_samples  # Minimum number of samples to form a dense region
        self.labels = None  # Labels for each point: -1 for noise, other values for clusters

    def fit(self, X):
        n_samples = len(X)
        self.labels = [-1] * n_samples  # Initially label all points as noise (-1)
        visited = [False] * n_samples  # track visited points
        cluster_id = 0  # Initialize cluster ID

        print("Starting DBSCAN fitting...")
        for i in range(n_samples):
            if visited[i]:
                continue
            visited[i] = True
            neighbors = self.region_query(X, i)  # Find neighbors for the current point
            if len(neighbors) < self.min_samples:
                self.labels[i] = -1  # Mark as noise if not enough neighbors
            else:
                self.expand_cluster(X, i, neighbors, cluster_id, visited)  # Expand the cluster
                cluster_id += 1  # Move to the next cluster

            if i % 1000 == 0:  # Debug progress update every 1000 iterations
                print(f"Processed {i} samples...")

        print("DBSCAN fitting complete.")

    def region_query(self, X, point_idx):
        """Find all points within eps distance of the point at index point_idx."""
        neighbors = []
        for i, point in enumerate(X):
            distance = self.euclidean_distance(X[point_idx], point)  # Use Euclidean distance
            if distance <= self.eps:
                neighbors.append(i)
        return neighbors

    def euclidean_distance(self, point1, point2):
        """Calculate Euclidean distance between two points"""
        return math.sqrt(sum((point1[i] - point2[i]) ** 2 for i in range(len(point1))))

    def expand_cluster(self, X, point_idx, neighbors, cluster_id, visited):
        """Expand the cluster with neighbors that are density-reachable from the core point."""
        self.labels[point_idx] = cluster_id
        queue = neighbors.copy()
        while queue:
            current_point = queue.pop(0)
            if not visited[current_point]:
                visited[current_point] = True
                new_neighbors = self.region_query(X, current_point)
                if len(new_neighbors) >= self.min_samples:
                    queue.extend(new_neighbors)  # Add new neighbors to the queue
            if self.labels[current_point] == -1:
                self.labels[current_point] = cluster_id


# Load the dataset
train_file = 'data/outfits_dataset.csv'  # Adjust path if necessary
df = pd.read_csv(train_file)

# Print sample to verify data is loaded correctly
print("Dataset Sample:")
print(df.head())

# Select relevant columns for clustering (ignore PostID)
X = df[['Color_Tag', 'Item1_Tag', 'Style_Tag', 'Season_Tag', 'Popularity']]

# Encode categorical columns (convert to numeric)
X_encoded = pd.get_dummies(X, drop_first=True)

# Convert to list of lists
X_values = X_encoded.values.tolist()

# Initialize DBSCAN and apply it to the numerical data
dbscan = SimpleDBSCAN(eps=10, min_samples=5)
dbscan.fit(X_values)

# Output the cluster labels
print("DBSCAN Cluster Labels:")
print(dbscan.labels_)
