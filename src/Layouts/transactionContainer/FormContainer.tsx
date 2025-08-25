'use client'
import { useSenerioContext } from '@/Contexts/SenerioContext'
import CombineForm from '@/Forms/CombineForm';

const FormContainer = () => {
  const { formData } = useSenerioContext();

  return (

    <div className="pt-2 px-4 min-w-12/20 pb-12">
      <div className="w-full min-h-screen bg-white rounded-lg shadow-md p-6 space-y-10">
        <div>
          {formData.length > 0 ? (
            <>
              <CombineForm formData={formData} />
            </>
          ) :
            <div className='text-center font-lg'>Please select a transaction from the side. You can mix and match multiple options to fit your needs.</div>}
        </div>
      </div>
    </div>
  )
}

export default FormContainer
