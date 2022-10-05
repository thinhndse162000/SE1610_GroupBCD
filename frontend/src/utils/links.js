import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = {
  author: [
    { id: 1, text: 'papers', path: '/author', icon: <IoBarChartSharp /> },
    // { id: 2, text: 'reviews', path: `paper-detail/:id`, icon: <MdQueryStats /> },
    { id: 2, text: 'submit paper', path: 'submit-paper', icon: <FaWpforms /> },
  ],
  member: [
    { id: 1, text: 'journal', path: '/', icon: <IoBarChartSharp /> },
  ],
  reviewer: [
    { id: 1, text: 'reviews', path: '/reviewer', icon: <IoBarChartSharp /> },
    { id: 2, text: 'submit review', path: 'submit-review', icon: <MdQueryStats /> },
    { id: 3, text: 'invitations', path: 'invitation', icon: <MdQueryStats /> },
  ]
}

export default links
