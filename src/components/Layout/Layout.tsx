import React from 'react';
import { CssBaseline, Container } from '@mui/material';

import Header from './Header';

type Props = { children: JSX.Element | JSX.Element[] };

export default function Layout({ children }: Props) {
  return (
    <Container>
      <CssBaseline />
      <Header />
      <main>{children}</main>
    </Container>
  );
}
