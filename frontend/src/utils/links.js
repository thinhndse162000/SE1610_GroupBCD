import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = {
  main: [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
],
  author: [
    { id: 1, text: 'papers', path: '/author', icon: <IoBarChartSharp /> },
    { id: 2, text: 'reviews', path: 'reviews', icon: <MdQueryStats /> },
    { id: 3, text: 'submit paper', path: 'submit-paper', icon: <FaWpforms /> },
  ],
  member: [
    { id: 1, text: 'member', path: '/author', icon: <IoBarChartSharp /> },
    { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
    { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
    { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  ]
}

export default links
