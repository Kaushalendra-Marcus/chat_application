import React from 'react'
import Leftpart from '../home/Leftpart/Leftpart'
import Rightpart from '../home/Rightpart/Rightpart'

const Chat_section = () => {
  return (
    <div className='h-screen flex'>
      <Leftpart />
      <Rightpart />
    </div>
  )
}

export default Chat_section
