import './Page.css';
import React, { FC } from 'react';

interface PageProps {
  children: JSX.Element;
}

const Page: FC<PageProps> = ({ children }) => {
  return <section className='page'>{children}</section>;
};

export default Page;
