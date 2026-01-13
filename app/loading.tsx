export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo pulse animation */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-yellow-600/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-yellow-600/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-light text-yellow-500">HNDS</span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-light">Učitavanje...</p>
          <div className="flex gap-1 justify-center">
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
