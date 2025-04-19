import pandas as pd
import numpy as np

# Number of samples (100,000 outfits)
num_samples = 100000

# Generate random data for the dataset
data = {
    'Color_Tag': np.random.choice(['Red', 'Blue', 'Green', 'Black', 'White'], num_samples),
    'Item1_Tag': np.random.choice(['Shirt', 'Pants', 'Jacket', 'Shoes'], num_samples),
    'Season_Tag': np.random.choice(['Summer', 'Winter', 'Fall', 'Spring'], num_samples),
    'Popularity': np.random.rand(num_samples)  # Random popularity score between 0 and 1
}

# Create the DataFrame
df = pd.DataFrame(data)

# Save the generated data to a CSV file
df.to_csv('../../data/outfits_dataset.csv', index=False)

# Confirm the data is generated and saved
print("Generated dataset sample:")
print(df.head())
