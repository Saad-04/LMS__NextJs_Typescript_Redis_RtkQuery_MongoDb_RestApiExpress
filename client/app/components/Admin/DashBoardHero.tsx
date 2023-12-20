import React, { useState } from 'react';
import DashboardHeader from './DashBoardHeader';
import DashboardWidgets from '../../components/Admin/Widgets/DashBoardWidgets';

type Props = {
  isDashboard?: boolean;
  activeRefreshUsers?: boolean;
  // activeRefreshAdminTeam?: boolean;

  activeRefreshCourses?: boolean;
};

const DashboardHero = ({ isDashboard, activeRefreshUsers, activeRefreshCourses }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader
        open={open}
        setOpen={setOpen}
        activeRefreshCourses={activeRefreshCourses}
        activeRefreshUsers={activeRefreshUsers}
        // activeRefreshAdminTeam={activeRefreshAdminTeam}
      />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;
