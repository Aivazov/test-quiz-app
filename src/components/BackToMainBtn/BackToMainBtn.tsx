import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const BackToMainBtn = (props: Props) => {
  return (
      <div>
          <Link to='/' className='bg-green-500 text-white p-2 rounded'>Back</Link>
    </div>
  )
}

export default BackToMainBtn