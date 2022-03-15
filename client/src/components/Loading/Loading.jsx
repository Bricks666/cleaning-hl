export const Loading = ({ isLoading, children }) => {
  return isLoading ? <p>Loading...</p> : children;
};
