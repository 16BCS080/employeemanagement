import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../../components/utils/Error'
import Spinner from '../../components/utils/Spinner'
import { registerUser } from '../../reduxstore/authActions'

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => { 
    if ( userInfo && userInfo.role !== "admin"){ 
      navigate('/user-profile') 
    }
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm = (data) => { 
    if(userInfo.role==="admin"){
      if (data.password !== data.confirmPassword) {
        setCustomError('Password mismatch');
        return
      } 
      data.email = data.email.toLowerCase();
      dispatch(registerUser(data));
    } else {
      setCustomError("You're not admin." );
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-input'
          {...register('name')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Confirm Password</label>
        <input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='dob'>DOB</label>
        <input
          type='date'
          className='form-input'
          {...register('dob')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='gender'>Gender</label>
        <select {...register("gender")} className='form-input' required>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      </div>
      <button type='submit' className='button' disabled={loading}>
        {loading ? <Spinner /> : 'Register'}
      </button>
    </form>
  )
}

export default RegisterScreen
