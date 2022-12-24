import React from 'react';
import Chart from '../../components/chart/Chart';
import Featured from '../../components/featured/Featured';
import List from '../../components/table/Table';
import Widget from '../../components/widget/Widget';
import HomeTemplate from '../../template/HomeTemlate';

const Home = () => {
  return (
    <HomeTemplate>
      <Widget />
      <div className='pt-10 grid grid-cols-12 w-full gap-4 justify-between justify-items-stretch'>
        <Featured />
        <Chart />
      </div>
      <List />
    </HomeTemplate>
  );
};

export default Home;
