import React from 'react';
import Dashboard from "../component/Dashboard/Dashboard.jsx";
import Layout from "../component/Layout/layout.jsx";

const DashboardPage = () => {
    return (
      <div className="bg-gray-100">
          <Layout>
              <Dashboard/>
          </Layout>
      </div>
    );
};

export default DashboardPage;
