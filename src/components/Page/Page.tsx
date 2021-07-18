import './Page.css';

interface PageProps {
  children: JSX.Element;
}

const Page = ({ children }: PageProps): JSX.Element => {
  return <section className='page'>{children}</section>;
};

export default Page;
