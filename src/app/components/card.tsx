import React from 'react';

type CardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    change?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
};

export const DashboardCard = ({
    title,
    value,
    icon,
    change,
    className = ''
}: CardProps) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
            </div>

            <div className="flex items-end">
                <p className="text-2xl font-semibold">{value}</p>

                {change && (
                    <div className={`ml-2 flex items-center text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}>
                        <span>{change.isPositive ? '↑' : '↓'}</span>
                        <span className="ml-1">{Math.abs(change.value)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
}