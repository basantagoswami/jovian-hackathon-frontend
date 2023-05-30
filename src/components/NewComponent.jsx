import React from 'react'
import { useParams } from 'react-router-dom'

function NewComponent() {
    const {id} = useParams();
  return (
    <div>
      NEW COMPONENT {id}
    </div>
  )
}

export default NewComponent
