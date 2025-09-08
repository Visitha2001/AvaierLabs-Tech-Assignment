import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import { useStore } from '@/store/useStore';

const App: React.FC = () => {
  const initializeData = useStore((state) => state.initializeData);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default App;