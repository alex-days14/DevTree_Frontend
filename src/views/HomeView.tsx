import SearchForm from "../components/SearchForm";
import Header from "../components/ui/Header";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-10 min-h-screen lg:bg-home lg:bg-home-xl bg-no-repeat bg-right-top">
        <div className="max-w-5xl mx-auto mt-10">
            <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                <h1 className="text-6xl font-black">
                    Todas tus <span className="text-cyan-400">Redes Sociales</span> en un enlace
                </h1>

                <p className="text-slate-800 text-xl">Únete a más de 459,000 developers compartiendo sus redes sociales. Comparte tu perfil de TikTok, Facebook, Youtube, Instagram, Github y más</p>

                <SearchForm/>
            </div>
        </div>
      </main>
    </>
  );
}
