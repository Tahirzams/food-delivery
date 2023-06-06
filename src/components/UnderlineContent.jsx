import React from 'react'

const UnderlineContent = ({ content }) => {
  return (
    <div className='  relative inline-block text-2xl font-semibold my-4 md:ml-12'>{content}
      <div className='absolute -bottom-2 left-0 w-1/2 h-[7px] rounded-lg bg-gradient-to-tr from-orange-400 to-orange-700 bg-blue-200'></div>
    </div>
  )
}

export default UnderlineContent