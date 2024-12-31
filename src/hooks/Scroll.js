import React from 'react';

export const useScroll = (scrollRef, fetchData) => {
  const handleScroll = () => {
    const element = scrollRef?.current;
    if (element && element.scrollTop + element.clientHeight >= element.scrollHeight) {
      fetchData();
    }
  };

  return {
    handleScroll
  }

};