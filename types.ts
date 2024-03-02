export interface Owner {
  login: string;
  avatar_url: string;
}

export interface RepositoryItem {
  id: any;
  html_url: string;
  owner: Owner;
  full_name: string;
  name: string;
  watchers_count: number;
  forks_count: number;
  stargazers_count: number;
  description: string;
}

export interface Languages {
  [key: string]: number;
}
