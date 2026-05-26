export default function Alert({ message, type = 'info', onClose }) {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-400' : 
                  type === 'error' ? 'bg-red-100 border-red-400' :
                  'bg-blue-100 border-blue-400';
  
  const textColor = type === 'success' ? 'text-green-700' : 
                    type === 'error' ? 'text-red-700' :
                    'text-blue-700';

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded border mb-4 relative`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-lg"
        >
          ✕
        </button>
      )}
    </div>
  );
}
