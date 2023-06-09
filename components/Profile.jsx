import RestaurantCard from "./RestaurantCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  let restaurants = data.rest;
  return (
    <section className='w-full'>
      <h1 className='text-2xl text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {restaurants?(restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            handleEdit={() => handleEdit && handleEdit(restaurant)}
            handleDelete={() => handleDelete && handleDelete(restaurant)}
          />
        ))):(
          "No restaurants found."
        )}
      </div>
    </section>
  );
};

export default Profile;
