export const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
};

export const today = new Date();
export const fiveDaysLater = new Date(today.getDate() + 5)
