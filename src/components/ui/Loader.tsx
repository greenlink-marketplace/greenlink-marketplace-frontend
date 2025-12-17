export default function Loader({ size = 32 }) {
  return <div className="animate-spin border-4 border-gray-300 border-t-green-600 rounded-full"
    style={{ width: size, height: size }} />;
}