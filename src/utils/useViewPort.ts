import React, { useState } from "react";
const useViewport = (): any => {
  const [width, setWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = (): any => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  // Return the width so we can use it in our components
  return { width };
};

export default useViewport;
