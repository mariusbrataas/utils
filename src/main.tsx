import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router';
import Home from './App.tsx';
import './globals.scss';
import RiskRewardCalc from './pages/RiskRewardCalc.tsx';

// const RiskRewardCalc = lazy(() => import('./pages/RiskRewardCalc.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex-1 content-center text-center">
          <div className="flex items-center justify-center gap-3 font-semibold">
            Loading <Spinner className="h-5 w-5" />
          </div>
        </div>
      }
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="risk-reward" element={<RiskRewardCalc />} />
        </Routes>
      </HashRouter>
    </Suspense>
  </StrictMode>
);

// const router = createHashRouter(
//   [
//     // {
//     //   path: '/*',
//     //   element: <Home />
//     // },
//     {
//       path: '/risk-reward-calc',
//       element: <RiskRewardCalc />
//     }
//   ]
//   // { basename: '/' }
// );

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Suspense
//       fallback={
//         <div className="flex-1 content-center text-center">
//           <div className="flex items-center justify-center gap-3 font-semibold">
//             Loading <Spinner className="h-5 w-5" />
//           </div>
//         </div>
//       }
//     >
//       <RouterProvider router={router} />
//     </Suspense>
//   </StrictMode>
// );
