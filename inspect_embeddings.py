import torch

try:
    data = torch.load('repo_embeddings.pt', map_location=torch.device('cpu'))
    print(f"Successfully loaded 'repo_embeddings.pt'.")
    print(f"Type of the loaded data: {type(data)}")
    if isinstance(data, dict):
        print(f"Keys in the dictionary: {list(data.keys())}")
    elif hasattr(data, 'shape'):
        print(f"Shape of the tensor: {data.shape}")
except Exception as e:
    print(f"An error occurred while reading the file: {e}")
