import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Experience
    </h1>
    <p className='desc text-center'>
      Your favourite restaurant repository, search here
    </p>

    <Feed />
  </section>
);

export default Home;
