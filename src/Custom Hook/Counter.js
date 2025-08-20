import React, { useState } from 'react'

const useCounter = () => {
  const [open, setOpen] = useState(false)
  function OpenModal(){
    setOpen(!open)
  }
  return {
    open, OpenModal
  }
}

export default useCounter