import { observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { FcOk } from 'react-icons/fc'
import { useParams } from 'react-router'

import AppContext from '../../../AppContext'
import MakeInput from '../../../components/editBox/MakeInput'
import MakeSelectBox from '../../../components/editBox/MakeSelectBox'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const EquipLogAdd = observer(({ setOnModal }) => {
  const { equipDetailDatas } = useStore()
  const appContext = useContext(AppContext)
  const { id } = useParams()

  const [newLog, setNewLog] = useState({
    content: '',
    date: '',
    repaired_manager_id: 1,
    repaired_purpose_id: 1,
  })

  return (
    <div className="relative h-[20rem] w-[60rem] rounded-lg  bg-white pt-5">
      <h1 className="flexCenter pb-10 text-2xl"> Add Equipment Repair log</h1>

      <div className="mt-5 flex justify-center">
        <MakeInput
          id="date"
          label={'Date'}
          value={''}
          style={''}
          type={'date'}
          onChange={(value) => setNewLog((prev) => ({ ...prev, date: value }))}
        />

        <MakeSelectBox
          id="repaired_purpose_id"
          label={'Purpose'}
          list={PurPoseValueArr}
          value={1}
          style={''}
          onChange={(value) => {
            setNewLog((prev) => ({ ...prev, repaired_purpose_id: value.value }))
          }}
        />

        <MakeSelectBox
          id="repaired_manager_id"
          label={'Manager'}
          list={ManagerValueArr}
          value={1}
          style={''}
          onChange={(value) => {
            setNewLog((prev) => ({ ...prev, repaired_manager_id: value.value }))
          }}
        />

        <MakeInput
          id="content"
          label={'Content'}
          value={''}
          style={''}
          type={''}
          onChange={(value) => setNewLog((prev) => ({ ...prev, content: value }))}
        />
      </div>

      {/* button  */}
      <div className="absolute bottom-0 left-0 w-full">
        <button
          type="button"
          className="h-10 w-1/2 bg-slate-400"
          onClick={() => setOnModal({ clicked: false, content: '' })}
        >
          Cancel
        </button>
        <button
          type="button"
          className="h-10 w-1/2  bg-primary"
          onClick={async () => {
            appContext.setToastMessage(['registration completed'])
            appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
            setOnModal({ clicked: false, content: '' })
            // console.log(newLog)
            // < post요청  >
            await fetch(`${SERVER_ADDRESS}equipment/${id}/post`, {
              method: 'POST',
              headers: { Authorization: localStorage.getItem('accessToken') },
              body: JSON.stringify(newLog),
            })
              .then((res) => res.json())
              .then((result) => console.log(result))

            //<get요청>
            await fetch(`${SERVER_ADDRESS}equipment/${id}?offset=0`)
              .then((res) => res.json())
              .then((result) => equipDetailDatas.setEquipment(result.equipment))
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
})

export default EquipLogAdd

const PurPoseValueArr = [
  { value: 1, text: 'battery replacement' },
  { value: 2, text: 'Replacement of parts' },
  { value: 3, text: 'n/w err. fix' },
]

const ManagerValueArr = [
  { value: 1, text: 'Leonard' },
  { value: 2, text: 'Martin' },
  { value: 3, text: 'Paul' },
]
