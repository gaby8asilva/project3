# to generate the random dataset
import pandas as pd
import numpy as np

def generate_fashion_trend_dataset(num_entries=100000):
    colors = ["neutrals", "bright", "pastels", "monochrome", "metallics", "patterns"]
    items = ["capris", "maxi skirt", "micro skirt", "ballet flats",
        "chunky sneakers", "oversized blazer", "denim jacket", "mini dress",
        "trousers", "knit sweaters"]
    styles = ["y2k", "clean girl", "coquette", "grunge", "minimalist", "streetwear",
              "old money", "cottage core", "boho chic"]
    seasons = ["Spring", "Summer", "Fall", "Winter"]

    data = {
        "PostID": np.arange(1, num_entries + 1),
        "Color_Tag": np.random.choice(colors, num_entries),
        "Item1_Tag": np.random.choice(items, num_entries),
        "Style_Tag": np.random.choice(styles, num_entries),
        "Season_Tag": np.random.choice(seasons, num_entries),
        "Popularity": np.random.randint(10, 1000, num_entries)
    }

    df = pd.DataFrame(data)
    df.to_csv("../../data/outfits_dataset.csv", index=False)
    print("Outfit data set generated successfully")

if __name__ == "__main__":
    generate_fashion_trend_dataset()
