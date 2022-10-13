import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'

const links = {
  author: [
    { id: 1, text: 'papers', path: '/author', icon: <IoBarChartSharp /> },
    // TODO: line below
    // { id: 2, text: 'reviews', path: `paper-detail/:id`, icon: <MdQueryStats /> },
    { id: 2, text: 'submit paper', path: 'submit-paper', icon: <FaWpforms /> },
  ],
  member: [
    { id: 1, text: 'search', path: '/', icon: <IoBarChartSharp /> },
    { id: 2, text: 'journal', path: 'journal', icon: <IoBarChartSharp /> },
    { id: 3, text: 'issues', path: 'journal/issue', icon: <IoBarChartSharp /> },
    { id: 4, text: 'publications', path: 'journal/publish', icon: <IoBarChartSharp /> },
  ],
  reviewer: [
    { id: 1, text: 'reviews', path: '/reviewer', icon: <IoBarChartSharp /> },
    { id: 2, text: 'invitations', path: 'invitation', icon: <MdQueryStats /> },
  ],
  manager: [
    { id: 1, text: 'papers', path: '/manager', icon: <IoBarChartSharp /> },
    { id: 2, text: 'invite', path: 'invite', icon: <IoBarChartSharp /> },
  ],
}

export default links
