import { PageRoutes } from '../../../../../enums/pageRoutes';
// const dashboard = `${process.env.PUBLIC_URL}/assets/images/dashboard.png`;
const matches = `${process.env.PUBLIC_URL}/assets/images/matches.png`;
const teams = `${process.env.PUBLIC_URL}/assets/images/Teams.png`;
const players = `${process.env.PUBLIC_URL}/assets/images/player.png`;
const umpires = `${process.env.PUBLIC_URL}/assets/images/umpire.png`;
const scorers = `${process.env.PUBLIC_URL}/assets/images/scorer.png`;
const groundsMen = `${process.env.PUBLIC_URL}/assets/images/groundsMen.png`;
const grounds = `${process.env.PUBLIC_URL}/assets/images/cricketGround.png`;

export const SidebarData = [
    // {
    //   title: 'Dashboard',
    //   path:PageRoutes.adminPanel,
    //   icon: dashboard,
    //   cName: 'sideNav-text'
    // },
    {
      title: 'Matches',
      path: PageRoutes.adminMatches,
      icon: matches,
      cName: 'sideNav-text'
    },
    {
      title: 'Teams',
      path: PageRoutes.adminTeams,
      icon: teams,
      cName: 'sideNav-text'
    },
    {
      title: 'Players',
      path: PageRoutes.adminPlayers,
      icon: players,
      cName: 'sideNav-text'
    },
    {
      title: 'Umpires',
      path: PageRoutes.adminUmpires,
      icon: umpires,
      cName: 'sideNav-text'
    },
    {
      title: 'Scorers',
      path: PageRoutes.adminScorers,
      icon: scorers,
      cName: 'sideNav-text'
    },
    {
        title: 'GroundsMen',
        path: PageRoutes.adminGroundsMen,
        icon: groundsMen,
        cName: 'sideNav-text'
      },
      {
        title: 'Grounds',
        path: PageRoutes.adminGrounds,
        icon: grounds,
        cName: 'sideNav-text'
      },
      {
        title: '',
        path: '',
        icon: '',
        cName: ''
      },
      {
        title: '',
        path: '',
        icon:'',
        cName: ''
      }
  ];
  
  