import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN

# Path to the random dataset
train_file = '../../data/outfits_dataset.csv'

# Load the dataset and skip the # lines
df = pd.read_csv(train_file, comment='#')

# Display the first few rows to check if the data is loaded properly
print("Dataset Sample:")
print(df.head())

# Check the columns to see what data we have
print("Dataset Columns:", df.columns)

# Select the relevant columns for clustering
X = df[['Color_Tag', 'Item1_Tag', 'Style_Tag', 'Season_Tag', 'Popularity']]

# Encode columns to numeric
X_encoded = pd.get_dummies(X, drop_first=True)  # Converts categorical columns to numerical values

# Standardize the data for DBSCAN
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Apply DBSCAN with parameters
dbscan = DBSCAN(eps=5.0, min_samples=10)
dbscan.fit(X_scaled)

# Output the cluster labels
print("DBSCAN Cluster Labels:")
print(dbscan.labels_)


print("Unique labels in DBSCAN:", set(dbscan.labels_))  # Check how many unique clusters (including noise)
