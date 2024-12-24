export default function Card() {
    return (
        <div className="relative w-40 h-64 bg-black rounded-lg overflow-hidden shadow-lg mx-auto">
            <img src="https://placehold.co/192x288" alt="Movie poster of a woman with curly hair surrounded by photographers" className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 flex items-center text-yellow-400 text-sm">
                <i className="fas fa-star"></i>
                <span className="ml-1">6.2</span>
            </div>
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-1 rounded">HD</div>
            <div className="absolute bottom-10 left-0 right-0 text-center text-white text-2xl font-bold">BEING MARIA</div>
            <div className="absolute bottom-2 left-0 right-0 text-center text-white text-sm">Being Maria (2024)</div>
        </div>
    );
}