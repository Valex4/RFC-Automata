import { useState } from 'react'
import { Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import toast, {Toaster} from 'react-hot-toast';
import Automata from './Automata';

import './App.css'

function App() {
  const [Data, setData] = useState()
  const [Valido, setValido] = useState(false)
  const validationSchema = Yup.object().shape({
    rfc: Yup.string()
      .max(4, 'El RFC debe tener máximo 4 caracteres')
      .matches(/^g[umy]*$/i, 'El RFC no es válido')
      .required('El RFC es requerido'),
  });

  return (
    <>
      <div className='flex justify-center items-center w-full h-screen gap-20'>
        <div className="">
          <div className='relative'>
            <div className='absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse'></div>
            <div className='bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out'>
              <h2 className='text-center text-3xl font-bold mb-10 text-gray-800'>
                RFC Validator
              </h2>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  rfc:""
                }}
                onSubmit={async(values, actions)=>{
                  console.log("Imprimiendo los valores ")
                  console.log(values.rfc)
                  toast.success('RFC Valido')
                  setData(values.rfc)
                  setValido(true)
                }}
              
              >{({values, errors, touched, setFieldValue, handleSubmit, handleChange, isSubmitting})=>(
                  <Form className='space-y-5'>
                    <div className="mb-5">
                        <label htmlFor="rfc" className="block mb-2 text-sm font-medium text-gray-900 ">Ingrese su RFC: </label>
                        <input type="text" name='rfc' onChange={handleChange} id="rfc" className={`w-full h-12 border ${Valido ? "border-green-400" : "border-gray-800"} px-3 rounded-lg  `}/>
                        <ErrorMessage name="rfc" className='text-red-500' component="div" />
                    </div>
                    <div className='flex item-center justify-center'>
                      <button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{isSubmitting ? "Comprobando..." : "Comprobar"}</button>
                    </div>
                  </Form> 
              )}
              </Formik>
            </div>
          </div>
        </div>
        {Valido && (
          <div className='flex justify-center items-center flex-col'>
            <h1 className='text-center text-3xl font-bold mb-10 text-gray-800'>Autómata</h1>
            <Automata entrada={Data}/>
          </div>
        )}
      </div>
      <Toaster />
    </>
  )
}

export default App
