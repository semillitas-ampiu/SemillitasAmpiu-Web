import type { ReactElement } from 'react';

import AppRouter from '@/routes/appRouter';

function App(): ReactElement {
  return (
    <div className="bg-gray-900 min-h-screen mt-4">
      <AppRouter />
    </div>
  );
}

export default App;
