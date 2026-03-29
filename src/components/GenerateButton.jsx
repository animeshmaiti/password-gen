
const GenerateButton = ({ onGenerate }) => {
  return (
    <button
      onClick={onGenerate}
      className="w-full bg-blue-500 text-white py-2 rounded-xl mt-4"
    >
      Generate Password
    </button>
  )
}

export default GenerateButton