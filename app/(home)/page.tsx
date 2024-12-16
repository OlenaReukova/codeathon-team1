import Slider from "./_components/slider";
import Campaign from "./_components/campaign";
import About from "./_components/about";

const page = () => {
  return (
    <>
      <div className="space-y-10">
        <Slider />
        <Campaign items={[]} />
        <About />
      </div>
    </>
  );
};
export default page;
