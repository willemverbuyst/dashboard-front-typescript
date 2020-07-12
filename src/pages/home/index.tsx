import React from 'react';
import HomeBarChart from './HomeBarChart';
import HomePolarChart from './HomePolarChart';
import HomeLineChart from './HomeLineChart';

export default function Home() {
  return (
    <div>
      <HomeBarChart />
      <HomePolarChart />
      <HomeLineChart />
    </div>
  );
}
