export default function AllMovieCard() {
    return (
        <div className="max-w-52 mx-auto bg-slate-300 shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
                <img src="https://placehold.co/300x450" alt="Movie poster of Venom: The Last Dance (2024)" className="w-full h-auto" />
                <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-1 rounded">6.2</div>
                <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-1 rounded">HD</div>
                <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-bold px-1 rounded">01:49</div>
            </div>
            <div className="p-4">
                <h2 className="text-center text-lg font-bold">Venom: The Last Dance (2024)</h2>
                <p className="text-center text-sm text-red-500 mt-2">
                    Action, Adventure, Sci-fi, Canada, United Kingdom, United States, WEBDL, 2024, 1080
                </p>
                <div className="flex justify-center mt-4">
                    <button className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded mr-2">TRAILER</button>
                    <button className="bg-pink-500 text-white text-sm font-bold py-2 px-4 rounded">NONTON MOVIE</button>
                </div>
            </div>
        </div>
    );
}