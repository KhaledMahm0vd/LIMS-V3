// client/src/components/Dashboard.js
import React from 'react';

const Dashboard = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">LIMS Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
        title="Recent Analysis"
        description="View your recent laboratory tests"
        bgColor="bg-blue-100"
        />
        <DashboardCard
        title="Pending Tests"
        description="Track ongoing analysis"
        bgColor="bg-green-100"
        />
        <DashboardCard
        title="Reports"
        description="Access completed test reports"
        bgColor="bg-purple-100"
        />
        </div>
        </div>
    );
};

const DashboardCard = ({ title, description, bgColor }) => (
    <div className={`${bgColor} p-6 rounded-lg`}>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
    </div>
);

export default Dashboard;
