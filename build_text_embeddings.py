from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
import json
print("loading model")
model=SentenceTransformer("all-MiniLM-L6-v2")
df=pd.read_csv("repositories.csv",usecols=["Name","Description","URL"])
df=df.head(5000)
print("loading descriptions")
df["Description"]=df["Description"].fillna("")
texts=df["Description"].tolist()
print("generating embeddings")
embs=model.encode(texts,show_progress_bar=True)
np.save("text_embeddings.npy",embs)
df[["Name","URL"]].to_json("repo_index.json",orient="records")