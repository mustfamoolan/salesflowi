import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainScreen from './MainScreen';
import CustomersManagement from './CustomersManagement';
import SubscriptionsManagement from './SubscriptionsManagement';
import PlansManagement from './PlansManagement';
import EmployeesManagement from './EmployeesManagement';
import Analytics from './Analytics';
import Notifications from './Notifications';
import Settings from './Settings';
import FinancialReports from './FinancialReports';
import SystemLogs from './SystemLogs';
import SupportTickets from './SupportTickets';

const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isArabic, setIsArabic] = useState(true);

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <MainScreen isArabic={isArabic} />;
            case 'customers':
                return <CustomersManagement isArabic={isArabic} />;
            case 'subscriptions':
                return <SubscriptionsManagement isArabic={isArabic} />;
            case 'plans':
                return <PlansManagement isArabic={isArabic} />;
            case 'employees':
                return <EmployeesManagement isArabic={isArabic} />;
            case 'analytics':
                return <Analytics isArabic={isArabic} />;
            case 'notifications':
                return <Notifications isArabic={isArabic} />;
            case 'settings':
                return <Settings isArabic={isArabic} />;
            case 'financial-reports':
                return <FinancialReports isArabic={isArabic} />;
            case 'system-logs':
                return <SystemLogs isArabic={isArabic} />;
            case 'support-tickets':
                return <SupportTickets isArabic={isArabic} />;
            default:
                return <MainScreen isArabic={isArabic} />;
        }
    };

    return (
        <div className={`admin-panel min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`}>
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                isArabic={isArabic}
            />

            <div className={`main-content transition-all duration-300 ${
                sidebarCollapsed
                    ? (isArabic ? 'mr-16' : 'ml-16')
                    : (isArabic ? 'mr-64' : 'ml-64')
            }`}>
                <Header
                    isArabic={isArabic}
                    setIsArabic={setIsArabic}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                />

                <main className="p-6">
                    {renderActiveSection()}
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
