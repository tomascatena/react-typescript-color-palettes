import React, { FC } from 'react';
import './Page.css';

interface PageProps {
  children: JSX.Element;
}

const Page: FC<PageProps> = ({ children }) => {
  return <section className='page'>{children}</section>;
};

export default Page;
