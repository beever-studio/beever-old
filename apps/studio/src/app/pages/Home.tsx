import banner from '../../assets/images/beaver.jpg';

export function HomePage() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      <img className="w-80 h-auto" src={banner} alt="" />
      <div className="flex flex-col items-center">
        <h1 className="font-caveat text-8xl text-white text-shadow shadow-primary">
          BEEVER
        </h1>
        <p className="font-caveat text-3xl text-white text-center">
          Your open source{' '}
          <span className="whitespace-nowrap">streaming studio</span>
        </p>
      </div>
    </div>
  );
}
