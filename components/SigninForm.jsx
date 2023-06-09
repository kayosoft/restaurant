import Link from "next/link";

const SigninForm = ({ type, credentials, setCredentials, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-end flex-col'>
      <h1 className='text-4xl text-left'>
        <span className='blue_gradient'>User Sign In</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Please sign in to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Email Address
          </span>
          <input
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            type='email'
            placeholder='Email'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Password
          </span>
          <input
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            type='password'
            required
            className='form_input'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : 'Sign In'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SigninForm;
