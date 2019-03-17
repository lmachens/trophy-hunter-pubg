import Octokit from '@octokit/rest';

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`
});

export default octokit;
