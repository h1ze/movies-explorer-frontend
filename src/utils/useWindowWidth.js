import React, { useLayoutEffect, useState } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  console.log(width);
  return width;
}

export default useWindowWidth;

// function ShowWindowDimensions(props) {
//   const [width, height] = useWindowSize();
//   return (
//     <span>
//       Window size: {width} x {height}
//     </span>
//   );
// }
