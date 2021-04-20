import { NextPage } from 'next';

import api from '../services/api';

interface Props {
  episodes: any;
}

const IndexPage: NextPage<Props> = (props) => {
  console.log(props.episodes);

  return <h1>Index</h1>;
};

export default IndexPage;

export async function getStaticProps() {
  const response = await api.get('episodes');

  return {
    props: {
      episodes: response.data,
    },
    revalidate: 86400, // 60 * 60 * 24,
  };
}
