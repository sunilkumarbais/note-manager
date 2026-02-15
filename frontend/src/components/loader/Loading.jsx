
const Loading = () => {
  return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-300 text-lg font-medium">Loading, please wait...</p>
      </div>
    </div>
  )
}

export default Loading