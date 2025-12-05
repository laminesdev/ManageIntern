function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">IMS</span>
          </div>
          <h1 className="text-2xl font-bold text-primary-800">
            Intern Management System
          </h1>
          <p className="text-gray-600 mt-2">✅ TailwindCSS v3 is working!</p>
          <p className="text-sm text-primary-600 mt-2">
            Light blue theme activated
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <h3 className="font-medium text-primary-700">Ready to Build</h3>
            <p className="text-sm text-primary-600 mt-1">
              Your project is now set up with:
              <br />
              • Vite + React + TypeScript
              <br />
              • TailwindCSS v3
              <br />
              • Light Blue Theme
            </p>
          </div>
          
          <button className="btn-primary w-full py-3">
            Continue to Next Step
          </button>
          
          <button className="btn-secondary w-full py-3">
            View Documentation
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Next: We'll install React Router, Zustand, and other packages
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
