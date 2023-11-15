import cn from 'classnames'
import { findInputError, isFormInvalid } from '../../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputErrors = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputErrors)

  const [shown, setShown] = useState(false)

  const togglePassword = () => {
    setShown(!shown)

  }

  return (
    <div className='position-relative'>
      <label htmlFor={id} className='py-2'>
        {label}
      </label>
      <div class="input-group">
        
        { type==="email" ? 
          <span class="input-group-text border-0 bg-transparent" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope} /></span>
          : type === "password" ? <><span class="input-group-text border-0 bg-transparent" id="basic-addon1"><FontAwesomeIcon icon={faLock} /></span>
          </>:<></>
        }
        <input  
            id={id}
            type={type==="password"?shown?"text":'password':type}
            className={className}
            placeholder={placeholder}
            autocomplete="on" {...register(name, validation)}
        />
        { type === "password" ? <span onClick={togglePassword} class="input-group-text border-0 bg-transparent"><FontAwesomeIcon icon={shown?faEyeSlash:faEye}/></span>
          :<></>
        }
      </div>

      
      {isInvalid && (
      <div class="errors pt-2">
        <AnimatePresence mode="wait" initial={false}>
              <InputError
                message={inputErrors.error.message}
                key={inputErrors.error.message}
              />
          </AnimatePresence>
        </div>
      )}


    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.span
      className="ps-3 text-danger rounded-md"
      {...framer_error}
    >
      <MdError />
      <span className='ps-2'>
        {message}
      </span>
    </motion.span>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
