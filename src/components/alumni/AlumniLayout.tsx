import { Outlet } from 'react-router-dom';
import { AlumniNav } from './AlumniNav';
import { AlumniFooter } from './AlumniFooter';

export function AlumniLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AlumniNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <AlumniFooter />
    </div>
  );
}
