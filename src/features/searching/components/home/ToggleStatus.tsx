import React from 'react'
import { useAtom } from 'jotai'
import { itemStatusAtom } from '../../atoms'
import { mediaTypeAtom } from '@/App'
import { mediaTypeConfig } from '@/config/constants'

const ToggleStatus: React.FC = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [_, setItemStatus] = useAtom(itemStatusAtom)
  return (
    <div>
      {mediaTypeConfig[mediaType].statusList.map((status: string, index: number)=> {
        return <button onClick={()=>setItemStatus(status)} key={index}>{status}</button>
      })}
    </div>
  )
}

export default ToggleStatus