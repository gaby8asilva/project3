import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN

# Path to the randomly generated dataset
train_file = '../../data/outfits_dataset.csv'  # Adjust path if necessary

# Load the dataset while skipping lines starting with '#'
df = pd.read_csv(train_file, comment='#')

# Display the first few rows to check if the data is loaded correctly
print("Dataset Sample:")
print(df.head())

# Check the columns to see what data we have
print("Dataset Columns:", df.columns)

# For now, let's select a few columns for clustering (modify as per your dataset's actual columns)
X = df[['Color_Tag', 'Item1_Tag', 'Season_Tag', 'Popularity']]  # Modify as needed

# Handle categorical columns by encoding them (e.g., converting 'Color_Tag' and 'Item1_Tag' to numeric)
X_encoded = pd.get_dummies(X, drop_first=True)  # Converts categorical columns to numerical values

# Standardize the data (important for DBSCAN)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Apply DBSCAN with adjusted parameters
dbscan = DBSCAN(eps=3.0, min_samples=5)  # Adjusted eps and min_samples
dbscan.fit(X_scaled)

# Output the cluster labels
print("DBSCAN Cluster Labels:")
print(dbscan.labels_)

# Optionally, you can also check how well DBSCAN did by comparing labels with the actual target labels
print("Unique labels in DBSCAN:", set(dbscan.labels_))  # Check how many unique clusters (including noise)
