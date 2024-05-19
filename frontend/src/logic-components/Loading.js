import React from 'react';

export const Loading = ({ loading, error, children }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return <>{children}</>;
};
