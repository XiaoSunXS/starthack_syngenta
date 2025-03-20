
// Helper function to determine risk color
export const getRiskColor = (risk: any) => {
    if (risk === 'High' || risk > 0.7) return 'text-red-500';
    if (risk === 'Medium' || (risk > 0.4 && risk <= 0.7)) return 'text-yellow-500';
    return 'text-green-500';
};