// Helper function to determine risk color
export const getRiskColor = (risk: string) => {
    if (risk === 'High') return 'text-red-500';
    if (risk === 'Medium') return 'text-yellow-500';
    return 'text-green-500';
};