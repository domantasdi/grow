export const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10);
};

export const getLastWeek = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const weekdays = date.toLocaleString('en-us', { weekday: 'short' });
    const monthAndDays = date.toLocaleString('en-us', {
      month: 'short',
      day: 'numeric'
    });
    const isoDate = date.toISOString().slice(0, 10);

    return {
      weekday: weekdays,
      monthAndDay: monthAndDays,
      isoDate
    };
  });
};

export const toWeekDay = (date) => {
  return new Date(date).toLocaleString('en-us', { weekday: 'short' });
};

export const getMonthAndDay = (date) => {
  return new Date(date).toLocaleString('en-us', {
    month: 'short',
    day: 'numeric'
  });
};
