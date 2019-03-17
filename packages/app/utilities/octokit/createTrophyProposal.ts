import { Trophy } from 'utilities/th-api/trophies';
import octokit from './octokit';

const createTrophyProposal = (trophy: Trophy) => {
  return octokit.issues.create({
    owner: 'lmachens',
    repo: 'trophy-hunter-pubg',
    labels: ['trophy proposal'],
    title: `[Trophy]: ${trophy.title}`,
    body: `${trophy.author} proposes to create ${trophy.title}:

\`\`\`json
${JSON.stringify(trophy, null, 2)}
\`\`\`
`
  });
};

export default createTrophyProposal;
