import '../_bootstrap';

import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'components/Link';

const Home = () => (
  <Link href="/matches">
    <Typography>Home</Typography>
  </Link>
);

export default Home;
