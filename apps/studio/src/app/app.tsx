// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Header } from './components/header';
import banner from '../assets/images/beaver.jpg';
export function App() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center pt-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <img className="w-80 h-auto" src={banner} alt="" />
          <div className="flex flex-col items-center">
            <h1 className="font-caveat text-8xl text-white text-shadow shadow-primary">
              BEEVER
            </h1>
            <p className="font-caveat text-3xl text-white">
              Your open source streaming studio
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
