export const transformUsernameToInitials = (username) => {
  return username.match(/\b(\w)/g);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
