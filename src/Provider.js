import { useState, useContext } from "react";
import { AppContext } from "./context";

const Provider = ({children}) => {
  
  const [newImgFlag, setNewImgFlag] = useState(false);

  return (
    <AppContext.Provider value={{
      newImgFlag, setNewImgFlag
    }}>
      {
        children
      }
    </AppContext.Provider>
  )
}

export default Provider;