import Link from "next/link";

const Form = ({ type, restaurant, setRestaurant, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-end flex-col'>
      <h1 className='text-4xl text-left'>
        <span className='blue_gradient '>{type} Restaurant</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share with the community
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Restaurant Name
          </span>
          <input
            value={restaurant.name}
            onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
            type='text'
            placeholder='Name'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Location
          </span>
          <input
            value={restaurant.location}
            onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })}
            type='text'
            placeholder='Location'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Contact
          </span>
          <input
            value={restaurant.contact}
            onChange={(e) => setRestaurant({ ...restaurant, contact: e.target.value })}
            type='text'
            placeholder='0780000000'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Description
          </span>

          <textarea
            value={restaurant.description}
            onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
            placeholder='Write about this restaurant'
            required
            className='form_textarea '
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
