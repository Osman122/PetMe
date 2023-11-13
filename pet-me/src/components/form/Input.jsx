import cn from 'classnames'
import { findInputError, isFormInvalid } from '../../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

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


  return (
    <div className={cn('flex flex-col w-full gap-2')}>
        <label htmlFor={id} className='py-1'>
          {label}
        </label>

      {multiline ? (
        <textarea
          id={id}
          type={type}
          className = {className}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
      <div class="errors py-2">
        <AnimatePresence mode="wait" initial={false}>
            {isInvalid && (
              <InputError
                message={inputErrors.error.message}
                key={inputErrors.error.message}
              />
            )}
          </AnimatePresence>
        </div>

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
