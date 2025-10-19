import torch
import pandas as pd

# Load the existing embeddings tensor from your file
try:
    embeddings_tensor = torch.load('repo_embeddings.pt', map_location=torch.device('cpu'))
    print("Successfully loaded the embeddings tensor from 'repo_embeddings.pt'.")
except Exception as e:
    print(f"An error occurred while reading 'repo_embeddings.pt': {e}")
    exit()

# Load the repository names from the CSV file
try:
    repo_df = pd.read_csv('repositories.csv', nrows=5000)
    # Assuming the column with repository names is called 'name'
    repo_names = repo_df['Name'].tolist()
    print("Successfully loaded repository names from 'repositories.csv'.")
except FileNotFoundError:
    print("Error: 'repositories.csv' not found. Please make sure the file is in the same directory.")
    exit()
except KeyError:
    print("Error: Could not find a column named 'name' in 'repositories.csv'. Please adjust the script to use the correct column name.")
    exit()
except Exception as e:
    print(f"An error occurred while reading 'repositories.csv': {e}")
    exit()

# Check if the number of repos matches the number of embeddings
if len(repo_names) != embeddings_tensor.shape[0]:
    print(f"Error: The number of repository names ({len(repo_names)}) does not match the number of embeddings ({embeddings_tensor.shape[0]}).")
    exit()

# Create a dictionary containing the embeddings and repo names
repo_embeddings_data = {
    'embeddings': embeddings_tensor,
    'repo_names': repo_names
}

# Save the new dictionary to the file, overwriting the old one
torch.save(repo_embeddings_data, 'repo_embeddings2.pt')

print("\nSuccessfully created 'repo_embeddings.pt' with the correct dictionary format.")
print("You can now try running the recommendation service again.")