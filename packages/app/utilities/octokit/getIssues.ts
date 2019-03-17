import octokit from './octokit';

const getIssues = () => {
  return octokit.issues.listForRepo({
    owner: 'lmachens',
    repo: 'trophy-hunter-pubg'
  });
};

export default getIssues;
