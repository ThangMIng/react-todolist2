import { useState, useEffect, useRef } from "react";
import "../App.css";

const useInfiniteScroll = (data) => {

  const [isFetching, setIsFetching] = useState(false);
  const ref = useRef(null);

  const handleScroll = () => {
    if (!ref.current) return;
    if (
      ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight &&!isFetching
    ) {
      setIsFetching(true)
    }
  };

  useEffect(() => {
    const scrollableElement = ref.current;
    if (!scrollableElement) return;

    scrollableElement.addEventListener("scroll", handleScroll);
    return () => scrollableElement.removeEventListener("scroll", handleScroll);
  }, []);

  return [ref, isFetching, setIsFetching];
};

export default useInfiniteScroll;
