import Slider from './_components/slider';
import Campaign from './_components/campaign';
import About from './_components/about';

const page = () => {
  return (
    <>
      <Slider />
      <Campaign items={[]} />
      <About />
    </>
  );
};

export default page;
