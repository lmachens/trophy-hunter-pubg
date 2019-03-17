import octokit from './octokit';
import { Issue } from './interface';

const createIssue = (issue: Issue) => {
  return octokit.issues.create({
    owner: 'lmachens',
    repo: 'trophy-hunter-pubg',
    labels: ['app issue'],
    title: `[App Issue]: ${issue.title}`,
    body: `${issue.author} has an issue:\n\n${issue.description}`
  });
};

export default createIssue;
